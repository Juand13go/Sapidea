import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Cursos.css';

// Ejemplo de lecciones por curso
const leccionesPorCurso = {
  'matematicas-basicas': ['Introducción a Matemáticas', 'Números Enteros'],
  'algebra-inicial': ['Conceptos Básicos de Álgebra', 'Ecuaciones Simples'],
};

function Cursos() {
  const { grado, materia, curso } = useParams(); // Obtener curso de la URL
  const lecciones = leccionesPorCurso[curso] || [];

  return (
    <div>
      <h1>Lecciones de {curso.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}</h1>
      <ul>
        {lecciones.map((leccion, index) => (
          <li key={index}>
            <Link to={`/lecciones/${grado}/${materia}/${curso}/${index}`}>{leccion}</Link>
          </li>
        ))}
      </ul>
      <h2>Quizzes de {curso.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}</h2>
      <Link to={`/quizzes/${grado}/${materia}/${curso}`}>Ver Quizzes</Link>
    </div>
  );
}

export default Cursos;
