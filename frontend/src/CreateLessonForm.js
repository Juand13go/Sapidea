// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const CreateLessonForm = () => {
// //   const [cursoId, setCursoId] = useState('');  // Estado para el ID del curso
// //   const [titulo, setTitulo] = useState('');
// //   const [contenido, setContenido] = useState('');
// //   const [videoUrl, setVideoUrl] = useState('');
// //   const [mensaje, setMensaje] = useState('');  // Estado para el mensaje
// //   const [error, setError] = useState('');  // Estado para los errores

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem('token');

// //     if (!cursoId) {
// //       setError('Por favor, ingresa el ID del curso.');
// //       return;
// //     }

// //     const data = {
// //       titulo,
// //       contenido,
// //       video_url: videoUrl,
// //     };

// //     try {
// //       const response = await axios.post(`http://127.0.0.1:5000/cursos/${cursoId}/lecciones`, data, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       if (response.status === 201) {
// //         setMensaje('Lección creada exitosamente.');
// //         setTitulo('');
// //         setContenido('');
// //         setVideoUrl('');
// //         setCursoId('');
// //         setError('');
// //       } else {
// //         setError('Error al crear la lección.');
// //       }
// //     } catch (error) {
// //       if (error.response) {
// //         // Gestionar errores de respuesta del servidor
// //         if (error.response.status === 403) {
// //           setError('No tienes permiso para crear una lección.');
// //         } else if (error.response.status === 400) {
// //           setError('Datos incompletos. Por favor, revisa los campos.');
// //         } else if (error.response.status === 401) {
// //           setError('Token inválido o expirado. Por favor, inicia sesión de nuevo.');
// //           localStorage.removeItem('token');
// //           window.location.href = '/login';
// //         } else {
// //           setError('Error en el servidor: ' + error.response.data.message);
// //         }
// //       } else {
// //         // Gestionar errores de conexión
// //         setError('Error en la conexión con el servidor.');
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Crear Lección</h2>
// //       {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>ID del Curso:</label>
// //           <input 
// //             type="text" 
// //             value={cursoId} 
// //             onChange={(e) => setCursoId(e.target.value)} 
// //             required 
// //           />
// //         </div>
// //         <div>
// //           <label>Título de la Lección:</label>
// //           <input 
// //             type="text" 
// //             value={titulo} 
// //             onChange={(e) => setTitulo(e.target.value)} 
// //             required 
// //           />
// //         </div>
// //         <div>
// //           <label>Contenido de la Lección:</label>
// //           <textarea 
// //             value={contenido} 
// //             onChange={(e) => setContenido(e.target.value)} 
// //             required 
// //           />
// //         </div>
// //         <div>
// //           <label>URL del Video:</label>
// //           <input 
// //             type="url" 
// //             value={videoUrl} 
// //             onChange={(e) => setVideoUrl(e.target.value)} 
// //             required 
// //           />
// //         </div>
// //         <button type="submit">Crear Lección</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreateLessonForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './FormStyles.css'; // Archivo CSS para estilos consistentes

// const CreateLessonForm = () => {
//   const [cursoId, setCursoId] = useState('');
//   const [titulo, setTitulo] = useState('');
//   const [contenido, setContenido] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [mensaje, setMensaje] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     if (!cursoId) {
//       setError('Por favor, ingresa el ID del curso.');
//       return;
//     }

//     const data = {
//       titulo,
//       contenido,
//       video_url: videoUrl,
//     };

//     try {
//       const response = await axios.post(`http://127.0.0.1:5000/cursos/${cursoId}/lecciones`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 201) {
//         setMensaje('Lección creada exitosamente.');
//         setTitulo('');
//         setContenido('');
//         setVideoUrl('');
//         setCursoId('');
//         setError('');
//       } else {
//         setError('Error al crear la lección.');
//       }
//     } catch (error) {
//       setError('Error en la conexión con el servidor.');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Crear Lección</h2>
//       {mensaje && <p className="form-message success">{mensaje}</p>}
//       {error && <p className="form-message error">{error}</p>}
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>ID del Curso:</label>
//           <input 
//             type="text" 
//             value={cursoId} 
//             onChange={(e) => setCursoId(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Título de la Lección:</label>
//           <input 
//             type="text" 
//             value={titulo} 
//             onChange={(e) => setTitulo(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Contenido de la Lección:</label>
//           <textarea 
//             value={contenido} 
//             onChange={(e) => setContenido(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>URL del Video:</label>
//           <input 
//             type="url" 
//             value={videoUrl} 
//             onChange={(e) => setVideoUrl(e.target.value)} 
//             required 
//           />
//         </div>
//         <button className="form-button" type="submit">Crear Lección</button>
//       </form>
//     </div>
//   );
// };

// export default CreateLessonForm;
