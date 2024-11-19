# update_passwords.py
from werkzeug.security import generate_password_hash
from app import create_app, db
from app.models import Usuario  # Asegúrate de tener la ruta correcta a tu modelo Usuario

# Crear la aplicación Flask
app = create_app()

# Contexto de la aplicación para poder acceder a la base de datos
with app.app_context():
    # Lista de usuarios y sus contraseñas actuales en texto plano
    usuarios = [
        {'username': 'Juan', 'password': '123456'},
        {'username': 'Maria', 'password': 'abcdef'},
        {'username': 'Pedro', 'password': 'password'}
    ]

    # Iterar sobre cada usuario para actualizar su contraseña
    for user in usuarios:
        # Buscar el usuario por su nombre
        usuario = Usuario.query.filter_by(username=user['username']).first()
        if usuario:
            # Encriptar la contraseña
            hashed_password = generate_password_hash(user['password'])
            # Actualizar la contraseña en la base de datos
            usuario.password = hashed_password
            db.session.commit()
            print(f"Contraseña de {user['username']} actualizada correctamente.")
