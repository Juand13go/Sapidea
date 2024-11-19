from . import db  # Importa la instancia de db inicializada en __init__.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    password = Column(String(100), nullable=False)
    rol = Column(String(20), nullable=False)

    def __init__(self, username, password, rol):
        self.username = username
        self.password = password
        self.rol = rol


class Curso(db.Model):
    __tablename__ = 'curso'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)  
    descripcion = db.Column(db.Text, nullable=False)
    grado = db.Column(db.String(50), nullable=False)
    materia = db.Column(db.String(50), nullable=False)

    # Relación con lecciones
    lecciones = relationship('Leccion', back_populates='curso')


class Leccion(db.Model):
    __tablename__ = 'leccion'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    contenido = db.Column(db.Text, nullable=False)
    video_url = db.Column(db.String(255), nullable=True)
    curso_id = db.Column(db.Integer, db.ForeignKey('curso.id'), nullable=False)

    # Relación con curso
    curso = db.relationship('Curso', back_populates='lecciones')


class Quiz(db.Model):
    __tablename__ = 'quiz'

    id = db.Column(db.Integer, primary_key=True)
    pregunta = db.Column(db.String(200), nullable=False)
    opciones = db.Column(JSON, nullable=False)  # Lista de opciones
    respuesta_correcta = db.Column(db.String(100), nullable=False)
    leccion_id = db.Column(db.Integer, db.ForeignKey('leccion.id'), nullable=False)

    # Relación con lección
    leccion = relationship('Leccion', backref='quizzes', lazy=True)


class Inscripcion(db.Model):
    __tablename__ = 'inscripcion'

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    curso_id = db.Column(db.Integer, db.ForeignKey('curso.id'), nullable=False)


class Progreso(db.Model):
    __tablename__ = 'progreso'

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    curso_id = db.Column(db.Integer, db.ForeignKey('curso.id'), nullable=False)
    leccion_id = db.Column(db.Integer, db.ForeignKey('leccion.id'), nullable=False)
    completado = db.Column(db.Boolean, default=False)
    puntaje = db.Column(db.Integer, nullable=False)
