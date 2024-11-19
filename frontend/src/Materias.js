import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Materias.css'; // Importa el archivo CSS

const Materias = () => {
  const { grado, materia } = useParams(); // Obtener el grado y la materia de la URL
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCursos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Por favor, inicia sesión.');
        setTimeout(() => {
          navigate('/login'); // Redirige al login si no hay token
        }, 2000);
        return;
      }

      try {
        // Realiza la solicitud para obtener los cursos de la materia y grado seleccionados
        const response = await fetch(`http://localhost:5000/cursos/${grado}/${materia}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCursos(data);
        } else if (response.status === 404) {
          setError('No hay cursos disponibles para esta materia.');
        } else {
          setError('Error al cargar los cursos.');
        }
      } catch (err) {
        setError('Error en la conexión: ' + err.message);
      }
    };

    fetchCursos();
  }, [grado, materia, navigate]);

  return (
    <div className="materias-container">
      <h1 className="materias-title">
        Cursos de {materia.charAt(0).toUpperCase() + materia.slice(1)} en{' '}
        {grado.charAt(0).toUpperCase() + grado.slice(1)}
      </h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="cursos-list">
          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <div className="curso-card" key={curso.id}>
                <h2 className="curso-titulo">{curso.nombre}</h2>
                <Link
                  to={`/cursos/${grado}/${materia}/${curso.nombre
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  className="curso-link"
                >
                  Ver Curso
                </Link>
              </div>
            ))
          ) : (
            <p className="no-cursos-message">No hay cursos disponibles para esta materia.</p>
          )}
        </div>
      )}
      <button className="back-button" onClick={() => navigate('/')}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default Materias;
