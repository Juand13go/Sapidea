class Config:
    SECRET_KEY = 'tu_clave_secreta_aqui'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/appcursos'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'tu_clave_secreta'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'tu_correo@gmail.com'
    MAIL_PASSWORD = 'tu_contraseña'
    MAIL_DEFAULT_SENDER = 'tu_correo@gmail.com'
    OAUTH_CLIENT_ID = '726703757334-i50sjf1msoc2qtcjitech9o7vu8mooco.apps.googleusercontent.com'
    OAUTH_CLIENT_SECRET = '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'
    OAUTH_REDIRECT_URI = 'https://70b2-2800-e2-1180-f-7550-be1b-1c36-2901.ngrok-free.app/auth/callback'