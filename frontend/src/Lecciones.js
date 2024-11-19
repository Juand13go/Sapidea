import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Lecciones.css';

const Lecciones = () => {
  const { grado, materia } = useParams(); // Captura los parámetros de grado y materia
  const navigate = useNavigate();
  const [lecciones, setLecciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLecciones = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Por favor, inicia sesión.');
        setTimeout(() => {
          navigate('/login'); // Redirige al login si no hay token
        }, 2000);
        return;
      }

      try {
        // Ajustar la URL para usar la nueva ruta
        const response = await fetch(`http://localhost:5000/cursos/${grado}/${materia}/lecciones`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLecciones(data);
        } else {
          setError('Error al cargar las lecciones.');
        }
      } catch (err) {
        setError('Error en la conexión: ' + err.message);
      }
    };

    fetchLecciones();
  }, [grado, materia, navigate]);

  return (
    <div className="lecciones-container">
      <h2 className="lecciones-title">Lecciones del curso</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="lecciones-list">
          {lecciones.length > 0 ? (
            lecciones.map((leccion) => (
              <div className="leccion-card" key={leccion.id}>
                <h3 className="leccion-titulo">{leccion.titulo}</h3>
                <Link to={`/leccion/${leccion.id}`} className="ver-detalle-link">
                  Ver Detalle
                </Link>
              </div>
            ))
          ) : (
            <p className="no-lecciones-message">No hay lecciones disponibles para este curso.</p>
          )}
        </div>
      )}
      <button className="back-button" onClick={() => navigate('/')}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default Lecciones;
