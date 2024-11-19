from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,verify_jwt_in_request
from werkzeug.security import check_password_hash
from sqlalchemy.orm import joinedload
from .models import Usuario, Curso, Leccion, Quiz, Inscripcion, db

main = Blueprint('main', __name__)

# Ruta del dashboard de administrador protegida
@main.route('/admin/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user = get_jwt_identity()
    if current_user['rol'] != 'admin':  # Ajustar a 'admin' si ese es el rol correcto
        return jsonify(message="Acceso denegado"), 403

    return jsonify(message="Bienvenido al Dashboard de Administrador")

# Funciones auxiliares para verificar el rol del usuario
def es_admin():
    current_user = get_jwt_identity()
    return current_user['rol'] == 'admin'

def es_profesor():
    current_user = get_jwt_identity()
    return current_user['rol'] == 'profesor'

def es_estudiante():
    current_user = get_jwt_identity()
    return current_user['rol'] == 'estudiante'

# Ruta para verificar la conexión con la base de datos
@main.route('/test-db')
def test_db():
    usuarios = Usuario.query.all()
    return jsonify([usuario.username for usuario in usuarios])

# Ruta para crear un curso, accesible tanto para administradores como para profesores
@main.route('/cursos', methods=['POST'])
@jwt_required()  # Solo usuarios autenticados pueden crear cursos
def crear_curso():
    current_user = get_jwt_identity()

    # Verificar si el usuario es administrador o profesor
    if current_user['rol'] not in ['admin', 'profesor']:
        return jsonify(message="No tienes permiso para realizar esta acción"), 403

    # Obtener los datos del curso desde la solicitud
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    grado = data.get('grado')
    materia = data.get('materia')

    # Verificar que todos los datos requeridos estén presentes
    if not all([nombre, descripcion, grado, materia]):
        return jsonify(message="Faltan datos"), 400

    try:
        # Crear un nuevo curso
        nuevo_curso = Curso(nombre=nombre, descripcion=descripcion, grado=grado, materia=materia)
        db.session.add(nuevo_curso)
        db.session.commit()

        return jsonify(message="Curso creado exitosamente", id=nuevo_curso.id), 201

    except Exception as e:
        db.session.rollback()  # Revertir los cambios en caso de error
        return jsonify(message="Error al crear el curso", error=str(e)), 500

@main.route('/cursos/<int:curso_id>/lecciones', methods=['POST'])
@jwt_required()
def crear_leccion(curso_id):
    current_user = get_jwt_identity()

    # Asegúrate de que la condición permita el acceso al rol 'admin'
    if not (es_profesor() or es_admin()):  
        return jsonify({'message': 'No autorizado'}), 403

    data = request.get_json()
    titulo = data.get('titulo')
    contenido = data.get('contenido')
    video_url = data.get('video_url')

    if not titulo or not contenido or not video_url:
        return jsonify({'message': 'Faltan datos'}), 400

    try:
        nueva_leccion = Leccion(titulo=titulo, contenido=contenido, video_url=video_url, curso_id=curso_id)
        db.session.add(nueva_leccion)
        db.session.commit()

        return jsonify({'message': 'Lección creada exitosamente'}), 201

    except Exception as e:
        return jsonify({'message': 'Error al crear la lección', 'error': str(e)}), 500
    
@main.route('/cursos/<int:curso_id>/quizzes', methods=['POST'])
@jwt_required()
def crear_quiz(curso_id):
    if not (es_profesor() or es_admin):
        return jsonify({'message': 'No autorizado'}), 403

    data = request.get_json()
    pregunta = data.get('pregunta')
    opciones = data.get('opciones')
    respuesta_correcta = data.get('respuesta_correcta')

    if not pregunta or not opciones or not respuesta_correcta:
        return jsonify({'message': 'Faltan datos'}), 400

    try:
        nuevo_quiz = Quiz(pregunta=pregunta, opciones=opciones, respuesta_correcta=respuesta_correcta, leccion_id=curso_id)
        db.session.add(nuevo_quiz)
        db.session.commit()

        return jsonify({'message': 'Quiz creado exitosamente'}), 201

    except Exception as e:
        return jsonify({'message': 'Error al crear el quiz', 'error': str(e)}), 500

@main.route('/mis_cursos', methods=['GET'])
@jwt_required()
def obtener_mis_cursos():
    current_user = get_jwt_identity()
    inscripciones = Inscripcion.query.filter_by(usuario_id=current_user['id']).all()

    if not inscripciones:
        return jsonify(message="No estás inscrito en ningún curso"), 404

    mis_cursos = [Curso.query.get(inscripcion.curso_id) for inscripcion in inscripciones]
    return jsonify([{'id': curso.id, 'nombre': curso.nombre} for curso in mis_cursos]), 200

# Obtener los quizzes de un curso específico
@main.route('/cursos/<int:curso_id>/quizzes', methods=['GET'])
@jwt_required()
def obtener_quizzes(curso_id):
    current_user = get_jwt_identity()

    if not verificar_inscripcion(current_user['id'], curso_id):
        return jsonify(message="No estás inscrito en este curso"), 403

    quizzes = Quiz.query.filter(Quiz.leccion.has(curso_id=curso_id)).all()

    if quizzes:
        return jsonify([{'id': quiz.id, 'pregunta': quiz.pregunta, 'opciones': quiz.opciones, 'respuesta_correcta': quiz.respuesta_correcta} for quiz in quizzes]), 200
    else:
        return jsonify(message="No se encontraron quizzes para este curso"), 404


# # Inscribir un estudiante en un curso
# @main.route('/cursos/<int:curso_id>/inscribir', methods=['POST'])
# @jwt_required()
# def inscribir_estudiante(curso_id):
#     current_user = get_jwt_identity()

#     # Solo los estudiantes pueden inscribirse
#     if not es_estudiante():
#         return jsonify({'message': 'No autorizado'}), 403

#     # Verificar si el estudiante ya está inscrito en el curso
#     inscripcion_existente = Inscripcion.query.filter_by(usuario_id=current_user['id'], curso_id=curso_id).first()

#     if inscripcion_existente:
#         return jsonify({'message': 'Ya estás inscrito en este curso'}), 400

#     # Crear una nueva inscripción
#     try:
#         nueva_inscripcion = Inscripcion(usuario_id=current_user['id'], curso_id=curso_id)
#         db.session.add(nueva_inscripcion)
#         db.session.commit()

#         return jsonify({'message': 'Inscripción exitosa'}), 201

#     except Exception as e:
#         return jsonify({'message': 'Error al inscribirse en el curso', 'error': str(e)}), 500

# # Inscribir un estudiante en un curso
# @main.route('/inscribir/<int:curso_id>', methods=['POST'])
# @jwt_required()
# def inscribir_curso(curso_id):
#     current_user = get_jwt_identity()

#     # Verificar si el usuario es un estudiante
#     if not es_estudiante():
#         return jsonify(message="Solo los estudiantes pueden inscribirse en cursos"), 403

#     try:
#         # Verificar si ya está inscrito en el curso
#         if verificar_inscripcion(current_user['id'], curso_id):
#             return jsonify(message="Ya estás inscrito en este curso"), 400

#         # Inscribir al estudiante en el curso
#         nueva_inscripcion = Inscripcion(usuario_id=current_user['id'], curso_id=curso_id)
#         db.session.add(nueva_inscripcion)
#         db.session.commit()

#         return jsonify(message="Inscripción exitosa"), 201

#     except Exception as e:
#         db.session.rollback()  # Revertir cambios en caso de error
#         return jsonify(message="Error al inscribirse", error=str(e)), 500

@main.route('/grados/<string:grado>/materias', methods=['GET'])
def obtener_materias_por_grado(grado):
    materias = ['Matemáticas', 'Ciencias', 'Lenguaje', 'Ciencias naturales']  
    return jsonify(materias), 200


@main.route('/cursos/<string:grado>/<string:materia>', methods=['GET'])
@jwt_required()
def obtener_cursos_por_materia(grado, materia):
    try:
        cursos = Curso.query.filter_by(grado=grado, materia=materia).all()
        cursos_data = [{'id': curso.id, 'nombre': curso.nombre, 'descripcion': curso.descripcion} for curso in cursos]
        return jsonify(cursos_data), 200 if cursos_data else 404
    except Exception as e:
        return jsonify(message="Error al obtener cursos", error=str(e)), 500


@main.route('/lecciones/<int:leccion_id>', methods=['GET'])
@jwt_required()
def obtener_leccion(leccion_id):
    try:
        leccion = Leccion.query.get(leccion_id)
        if not leccion:
            return jsonify(message="Lección no encontrada"), 404

        # Obtener los quizzes relacionados con la lección
        quizzes = Quiz.query.filter_by(leccion_id=leccion_id).all()
        quizzes_data = [{'id': quiz.id, 'pregunta': quiz.pregunta, 'opciones': quiz.opciones} for quiz in quizzes]

        leccion_data = {
            'id': leccion.id,
            'titulo': leccion.titulo,
            'contenido': leccion.contenido,
            'video_url': leccion.video_url,
            'quizzes': quizzes_data  # Agrega los quizzes al objeto de lección
        }
        return jsonify(leccion_data), 200

    except Exception as e:
        return jsonify(message="Error al obtener la lección", error=str(e)), 500

@main.route('/cursos/<int:curso_id>/lecciones', methods=['GET'])
@jwt_required()
def obtener_lecciones(curso_id):
    try:
        lecciones = Leccion.query.filter_by(curso_id=curso_id).all()
        lecciones_data = [{'id': leccion.id, 'titulo': leccion.titulo, 'contenido': leccion.contenido, 'video_url': leccion.video_url} for leccion in lecciones]
        return jsonify(lecciones_data), 200 if lecciones_data else 404
    except Exception as e:
        return jsonify(message="Error al obtener lecciones", error=str(e)), 500

@main.route('/cursos/<string:grado>/<string:materia>/lecciones', methods=['GET'])
@jwt_required()
def obtener_lecciones_por_grado_y_materia(grado, materia):
    try:
        curso = Curso.query.filter_by(grado=grado, materia=materia).first()
        if not curso:
            return jsonify(message="ID del curso no encontrado"), 404

        lecciones = Leccion.query.filter_by(curso_id=curso.id).all()
        lecciones_data = [{'id': leccion.id, 'titulo': leccion.titulo, 'contenido': leccion.contenido, 'video_url': leccion.video_url} for leccion in lecciones]
        return jsonify(lecciones_data), 200 if lecciones_data else 404
    except Exception as e:
        return jsonify(message="Error al obtener lecciones", error=str(e)), 500

@main.route('/quizzes/<int:leccion_id>/validar', methods=['OPTIONS', 'POST'])
@jwt_required()
def validar_respuestas(leccion_id):
    if request.method == 'OPTIONS':
        return '', 200  # Respuesta vacía con código 200 para preflight request

    # Lógica existente para manejar la validación de respuestas
    try:
        data = request.get_json()
        respuestas = data.get('respuestas', {})

        if not respuestas:
            return jsonify(message="No se enviaron respuestas"), 400

        quizzes = Quiz.query.filter_by(leccion_id=leccion_id).all()

        resultados = []
        for quiz in quizzes:
            respuesta_correcta = quiz.respuesta_correcta
            respuesta_usuario = respuestas.get(str(quiz.id))

            if respuesta_usuario is None:
                resultado = "Sin responder"
            elif respuesta_usuario == respuesta_correcta:
                resultado = "Correcto"
            else:
                resultado = "Incorrecto"

            resultados.append({
                'id': quiz.id,
                'pregunta': quiz.pregunta,
                'respuesta_usuario': respuesta_usuario,
                'respuesta_correcta': respuesta_correcta,
                'resultado': resultado
            })

        return jsonify(resultados=resultados), 200

    except Exception as e:
        return jsonify(message="Error al validar respuestas", error=str(e)), 500


@main.route('/')
def home():
    return jsonify(message="Conexión exitosa con el backend!")

