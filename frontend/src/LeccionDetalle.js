import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LeccionDetalle.css';

const LeccionDetalle = () => {
  const { leccionId } = useParams();
  const [leccion, setLeccion] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para redirigir

  // Función para convertir URL a formato embebido
  const convertirUrlYoutube = (url) => {
    try {
      if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('youtu.be')) {
        const videoId = url.split('youtu.be/')[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url; // Devuelve la URL sin cambios si no es de YouTube
    } catch (err) {
      console.error('Error al convertir la URL de YouTube:', err);
      return url;
    }
  };

  useEffect(() => {
    const fetchLeccion = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Por favor, inicia sesión.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/lecciones/${leccionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Convertir URL del video a formato embebido si es necesario
          const embedUrl = convertirUrlYoutube(data.video_url);
          setLeccion({ ...data, video_url: embedUrl });
        } else {
          setError('Error al cargar la lección.');
        }
      } catch (err) {
        setError('Error en la conexión: ' + err.message);
      }
    };

    fetchLeccion();
  }, [leccionId, navigate]);

  return (
    <div className="leccion-detalle">
      {leccion ? (
        <>
          <h1>{leccion.titulo}</h1>
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src={leccion.video_url}
              title={leccion.titulo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p>{leccion.contenido}</p>

          {/* Botón para redirigir a la página de quizzes */}
          <button
            onClick={() => navigate(`/quizzes/${leccionId}`)}
            className="ver-quizzes-button"
          >
            Ver Quizzes
          </button>
        </>
      ) : (
        <p className="error-message">{error || 'Cargando lección...'}</p>
      )}

      {/* Botón para volver al inicio */}
      <button className="back-button" onClick={() => navigate('/')}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default LeccionDetalle;
