from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from flask_mail import Mail
from .config import Config

# Inicializa las extensiones
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializa las extensiones con la aplicación
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    # Habilita CORS para todas las rutas
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    # Importa los modelos después de la inicialización de db
    with app.app_context():
        from . import models  # Importar modelos aquí para evitar el import circular

    # Registra los blueprints
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # Ruta raíz para verificar que el servidor esté funcionando
    @app.route('/')
    def home():
        return jsonify(message="¡Bienvenido a la API de la Plataforma de Aprendizaje Online!"), 200

    return app
