import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MisCursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Obtener los cursos en los que el estudiante está inscrito
    axios.get('http://127.0.0.1:5000/mis_cursos', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setCursos(response.data);
    })
    .catch(error => {
      console.error('Error al obtener los cursos inscritos:', error);
    });
  }, []);

  return (
    <div>
      <h2>Mis Cursos</h2>
      <ul>
        {cursos.map(curso => (
          <li key={curso.id}>{curso.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default MisCursos;
