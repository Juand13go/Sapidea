import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const { grado, materia } = useParams();
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCursos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Por favor, inicia sesión.');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/cursos/${grado}/${materia}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCursos(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error al cargar los cursos.');
        }
      } catch (err) {
        setError('Error en la conexión: ' + err.message);
      }
    };

    fetchCursos();
  }, [grado, materia]);

  return (
    <div className="courses-container">
      <h1>
        Cursos de {materia.charAt(0).toUpperCase() + materia.slice(1)} en{' '}
        {grado.charAt(0).toUpperCase() + grado.slice(1)}
      </h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="courses-list">
          {cursos.map((curso) => (
            <div className="course-card" key={curso.id}>
              <h3>{curso.nombre}</h3>
              <p>{curso.descripcion}</p>
              <Link to={`/cursos/${curso.id}/leccion`}>Ver Lección</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
