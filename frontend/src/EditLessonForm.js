// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditLessonForm = ({ cursoId, leccionId }) => {
//   const [titulo, setTitulo] = useState('');
//   const [contenido, setContenido] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');

//   useEffect(() => {
//     // Cargar los datos de la lección actual
//     axios.get(`http://127.0.0.1:5000/cursos/${cursoId}/lecciones/${leccionId}`)
//       .then(response => {
//         const { titulo, contenido, video_url } = response.data;
//         setTitulo(titulo);
//         setContenido(contenido);
//         setVideoUrl(video_url);
//       })
//       .catch(error => console.error('Error al cargar la lección:', error));
//   }, [cursoId, leccionId]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const data = { titulo, contenido, video_url: videoUrl };

//     axios.put(`http://127.0.0.1:5000/cursos/${cursoId}/lecciones/${leccionId}`, data, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(response => {
//         alert('Lección actualizada exitosamente');
//       })
//       .catch(error => {
//         console.error('Error al actualizar la lección:', error);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Título de la Lección</label>
//         <input 
//           type="text" 
//           value={titulo} 
//           onChange={(e) => setTitulo(e.target.value)} 
//           required 
//         />
//       </div>
//       <div>
//         <label>Contenido de la Lección</label>
//         <textarea 
//           value={contenido} 
//           onChange={(e) => setContenido(e.target.value)} 
//           required 
//         />
//       </div>
//       <div>
//         <label>URL del Video</label>
//         <input 
//           type="url" 
//           value={videoUrl} 
//           onChange={(e) => setVideoUrl(e.target.value)} 
//           required 
//         />
//       </div>
//       <button type="submit">Actualizar Lección</button>
//     </form>
//   );
// };

// export default EditLessonForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditLessonForm = ({ cursoId, leccionId }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Cargar los datos de la lección actual
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No se encontró un token. Por favor, inicia sesión.');
      return;
    }

    axios
      .get(`http://127.0.0.1:5000/cursos/${cursoId}/lecciones/${leccionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { titulo, contenido, video_url } = response.data;
        setTitulo(titulo);
        setContenido(contenido);
        setVideoUrl(video_url);
      })
      .catch((error) => {
        console.error('Error al cargar la lección:', error);
        setError('No se pudo cargar la información de la lección.');
      });
  }, [cursoId, leccionId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No se encontró un token. Por favor, inicia sesión.');
      return;
    }

    const data = { titulo, contenido, video_url: videoUrl };

    axios
      .put(`http://127.0.0.1:5000/cursos/${cursoId}/lecciones/${leccionId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSuccess('Lección actualizada exitosamente.');
      })
      .catch((error) => {
        console.error('Error al actualizar la lección:', error);
        setError('No se pudo actualizar la lección.');
      });
  };

  return (
    <div>
      <h2>Editar Lección</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título de la Lección</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contenido de la Lección</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL del Video</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Actualizar Lección</button>
      </form>
    </div>
  );
};

export default EditLessonForm;
