from flask import Blueprint, request, jsonify, current_app, redirect, session, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_mail import Message
from google_auth_oauthlib.flow import Flow
import requests
from .models import Usuario, db
from . import mail

auth = Blueprint('auth', __name__)

def get_google_auth_flow():
    return Flow.from_client_config(
        {
            "web": {
                "client_id": current_app.config['OAUTH_CLIENT_ID'],
                "client_secret": current_app.config['OAUTH_CLIENT_SECRET'],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [current_app.config['OAUTH_REDIRECT_URI']],
            }
        },
        scopes=["https://www.googleapis.com/auth/userinfo.email", "openid", "https://www.googleapis.com/auth/userinfo.profile"],
        redirect_uri=current_app.config['OAUTH_REDIRECT_URI']
    )

# Ruta para iniciar sesión con Google
@auth.route('/login/google')
def login_google():
    flow = get_google_auth_flow()
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    session['state'] = state
    return redirect(authorization_url)

# Callback de Google OAuth
@auth.route('/auth/callback')
def google_callback():
    try:
        print("Iniciando el flujo de Google OAuth Callback")  # Depuración
        flow = get_google_auth_flow()
        print("Flujo de Google obtenido correctamente")  # Depuración

        # Intentar obtener el token de acceso
        flow.fetch_token(authorization_response=request.url)
        print("Token de acceso obtenido correctamente")  # Depuración

        # Verificar el estado de OAuth
        if session['state'] != request.args.get('state'):
            print("Error: Estado de OAuth no coincide")  # Depuración
            return jsonify({'message': 'Estado de OAuth no coincide'}), 400

        credentials = flow.credentials
        print(f"Credenciales obtenidas: {credentials}")  # Depuración

        # Realizar la solicitud de información del usuario
        userinfo_request = requests.get(
            'https://www.googleapis.com/oauth2/v1/userinfo',
            params={'alt': 'json'},
            headers={'Authorization': f'Bearer {credentials.token}'}
        )
        userinfo = userinfo_request.json()
        print(f"Información de usuario obtenida: {userinfo}")  # Depuración

        # Obtener información del usuario
        email = userinfo.get('email')
        if not email:
            print("No se pudo obtener el correo electrónico")  # Depuración
            return jsonify({'message': 'No se pudo obtener el correo electrónico'}), 400

        # Registrar o autenticar al usuario
        usuario = Usuario.query.filter_by(username=email).first()
        if not usuario:
            print(f"Registrando nuevo usuario con email: {email}")  # Depuración
            usuario = Usuario(username=email, password='', rol='estudiante')
            db.session.add(usuario)
            db.session.commit()

        access_token = create_access_token(identity={'id': usuario.id, 'username': usuario.username, 'rol': usuario.rol})
        print("Token de acceso creado")  # Depuración
        return redirect(f'{current_app.config["FRONTEND_URL"]}/?token={access_token}')

    except Exception as e:
        print(f"Error en la autenticación con Google: {str(e)}")  # Depuración
        return jsonify({'message': 'Error en la autenticación con Google', 'error': str(e)}), 500


@auth.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(f"Datos recibidos para el registro: {data}")  # Depuración

        username = data.get('username')
        password = data.get('password')
        rol = data.get('rol')

        if not username or not password or not rol:
            print("Faltan datos para el registro")  # Depuración
            return jsonify(message="Faltan datos"), 400

        usuario_existente = Usuario.query.filter_by(username=username).first()
        if usuario_existente:
            print("El usuario ya existe")  # Depuración
            return jsonify(message="El usuario ya existe"), 409

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
        nuevo_usuario = Usuario(username=username, password=hashed_password, rol=rol)
        db.session.add(nuevo_usuario)
        db.session.commit()

        print("Usuario registrado exitosamente")  # Depuración
        return jsonify(message="Usuario registrado exitosamente"), 201

    except Exception as e:
        print(f"Error al registrar usuario: {str(e)}")  # Depuración
        return jsonify(message="Error al registrar usuario", error=str(e)), 500

# Ruta para iniciar sesión
@auth.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify(message="Faltan datos"), 400

        usuario = Usuario.query.filter_by(username=username).first()
        if not usuario:
            return jsonify(message="Usuario no encontrado"), 404

        if not check_password_hash(usuario.password, password):
            return jsonify(message="Credenciales incorrectas"), 401

        # Incluir el rol en el token
        access_token = create_access_token(identity={
            'id': usuario.id,
            'username': usuario.username,
            'rol': usuario.rol
        })
        
        return jsonify(access_token=access_token, username=usuario.username, rol=usuario.rol), 200
    except Exception as e:
        return jsonify(message="Error al iniciar sesión", error=str(e)), 500


# Ruta para restablecimiento de contraseña
@auth.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({'message': 'Por favor, proporciona un correo electrónico'}), 400

        usuario = Usuario.query.filter_by(username=email).first()
        if not usuario:
            return jsonify({'message': 'Correo electrónico no encontrado'}), 404

        msg = Message(
            subject="Restablecimiento de contraseña",
            sender=current_app.config['MAIL_DEFAULT_SENDER'],
            recipients=[email]
        )
        msg.body = f"Hola {usuario.username},\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\nhttp://tu-dominio.com/reset-password/{usuario.id}\n\nGracias."
        
        mail.send(msg)
        return jsonify({'message': f'Se ha enviado un correo de restablecimiento a {email}'}), 200
    except Exception as e:
        return jsonify({'message': 'Error al enviar el correo de restablecimiento', 'error': str(e)}), 500


@auth.route('/test-db', methods=['GET'])
def test_db():
    try:
        usuarios = Usuario.query.all()
        return jsonify([usuario.username for usuario in usuarios]), 200
    except Exception as e:
        print(f"Error al conectar con la base de datos: {str(e)}")  # Depuración
        return jsonify(message="Error al conectar con la base de datos", error=str(e)), 500
