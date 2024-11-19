from sqlalchemy import create_engine

# Usa la misma URI de tu configuración
engine = create_engine('mysql+pymysql://root:@localhost/appcursos')
try:
    conn = engine.connect()
    print("Conexión establecida con éxito")
    conn.close()
except Exception as e:
    print(f"Error conectando a la base de datos: {e}")
