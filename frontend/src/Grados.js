import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Grados.css';

const materiasPorGrado = {
  preescolar: ['Matemáticas', 'Naturales', 'Lenguaje'],
  primero: ['Matemáticas', 'Sociales', 'Inglés'],
  segundo: ['Matemáticas', 'Lenguaje', 'Inglés'],
  tercero: ['Matemáticas', 'Lenguaje', 'Inglés'],
  cuarto: ['Matemáticas','Inglés', 'Lenguaje'],
  quinto: ['Matemáticas', 'Lenguaje', 'Inglés'],
  sexto: ['Matemáticas', 'Lenguaje', 'Inglés'],
  septimo: ['Matemáticas', 'Inglés', 'Lenguaje'],
  octavo: ['Matemáticas', 'Lenguaje', 'Inglés'],
  noveno: ['Matemáticas', 'Lenguaje', 'Inglés', 'Química', 'Física', 'Biología'],
  decimo: ['Matemáticas', 'Lenguaje', 'Inglés', 'Química', 'Física', 'Biología'],
  once: ['Matemáticas', 'Lenguaje', 'Inglés', 'Química', 'Física', 'Biología' ],
};

const animationIcons = {
  Matemáticas: ['➕', '➖', '✖️', '➗'],
  Naturales: ['🌱', '🐦', '🌻', '🌍'],
  Lenguaje: ['📚', '✏️', '📖', '📜'],
  Sociales: ['🌎', '🧭', '📜', '🏛️'],
  Física: ['🔧', '📐', '⚡', '💡'],
  Química: ['⚗️', '🌡️', '💉', '🧬'],
  Biología: ['🧬', '🧫', '🌿', '🦠'],
  Inglés: ['📘', '🖊️', '💬', '🇬🇧'],
};

function Grados() {
  const { grado } = useParams();
  const materias = materiasPorGrado[grado] || [];
  const [hoveredMateria, setHoveredMateria] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="grados-container">
      <h1 className="grados-title">
        Materias de {grado.charAt(0).toUpperCase() + grado.slice(1)}
      </h1>
      <div className="materias-list">
        {materias.map((materia, index) => (
          <div
            className="materia-card"
            key={index}
            onMouseEnter={() => setHoveredMateria(materia)}
            onMouseLeave={() => setHoveredMateria(null)}
          >
            <Link
              to={`/materias/${grado}/${materia.toLowerCase()}`}
              className="materia-link"
            >
              {materia}
            </Link>
            {hoveredMateria === materia && (
              <div className="animation-container">
                {animationIcons[materia]?.map((icon, idx) => (
                  <span className={`animated-icon corner-${idx}`} key={idx}>
                    {icon}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Volver
      </button>
    </div>
  );
}

export default Grados;
