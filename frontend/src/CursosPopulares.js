import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './CursosPopulares.css';

function CursosPopulares() {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const cursos = [
    {
      id: 1,
      titulo: "Introducción a Matemáticas",
      descripcion: "Aprende los conceptos básicos de matemáticas.",
      videoUrl: "/videos/matematicas.mp4",
    },
    {
      id: 2,
      titulo: "Robótica para principiantes",
      descripcion: "Automaticemos funciones.",
      videoUrl: "/videos/robotica.mp4",
    },
    {
      id: 3,
      titulo: "Introducción a la Programación",
      descripcion: "Comienza tu camino en el mundo de la programación.",
      videoUrl: "/videos/video_programacion.mp4",
    },
  ];

  return (
    <div className="cursos-populares-container">
      <Navbar />
      <div className="cursos-content">
        <h1 className="cursos-title">Cursos Populares</h1>
        <div className="cursos-list">
          {cursos.map((curso) => (
            <div key={curso.id} className="curso-card">
              <h2 className="curso-titulo">{curso.titulo}</h2>
              <video className="curso-video" controls>
                <source src={curso.videoUrl} type="video/mp4" />
              </video>
              <p className="curso-descripcion">{curso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Volver
      </button>
    </div>
  );
}

export default CursosPopulares;
