// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const CreateQuizForm = ({ cursoId }) => {
// //   const [pregunta, setPregunta] = useState('');
// //   const [opciones, setOpciones] = useState('');
// //   const [respuestaCorrecta, setRespuestaCorrecta] = useState('');

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem('token'); // Suponiendo que el token está en localStorage

// //     const data = {
// //       pregunta,
// //       opciones: opciones.split(',').map(opcion => opcion.trim()), // Separa las opciones por comas y elimina espacios
// //       respuesta_correcta: respuestaCorrecta,
// //     };

// //     axios.post(`http://127.0.0.1:5000/cursos/${cursoId}/quizzes`, data, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     })
// //       .then(() => {
// //         alert('Quiz creado exitosamente');
// //       })
// //       .catch(error => {
// //         console.error('Error al crear el quiz:', error);
// //       });
// //   };

// //   return (
// //     <div>
// //       <h2>Crear Quiz</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Pregunta</label>
// //           <input 
// //             type="text" 
// //             value={pregunta} 
// //             onChange={(e) => setPregunta(e.target.value)} 
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Opciones (separadas por comas)</label>
// //           <input 
// //             type="text" 
// //             value={opciones} 
// //             onChange={(e) => setOpciones(e.target.value)} 
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Respuesta Correcta</label>
// //           <input 
// //             type="text" 
// //             value={respuestaCorrecta} 
// //             onChange={(e) => setRespuestaCorrecta(e.target.value)} 
// //             required
// //           />
// //         </div>
// //         <button type="submit">Crear Quiz</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreateQuizForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './FormStyles.css'; // Archivo CSS para estilos consistentes

// const CreateQuizForm = ({ cursoId }) => {
//   const [pregunta, setPregunta] = useState('');
//   const [opciones, setOpciones] = useState('');
//   const [respuestaCorrecta, setRespuestaCorrecta] = useState('');
//   const [mensaje, setMensaje] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const data = {
//       pregunta,
//       opciones: opciones.split(',').map(opcion => opcion.trim()),
//       respuesta_correcta: respuestaCorrecta,
//     };

//     axios.post(`http://127.0.0.1:5000/cursos/${cursoId}/quizzes`, data, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(() => {
//         setMensaje('Quiz creado exitosamente.');
//         setPregunta('');
//         setOpciones('');
//         setRespuestaCorrecta('');
//         setError('');
//       })
//       .catch(() => {
//         setError('Error al crear el quiz.');
//       });
//   };

//   return (
//     <div className="form-container">
//       <h2>Crear Quiz</h2>
//       {mensaje && <p className="form-message success">{mensaje}</p>}
//       {error && <p className="form-message error">{error}</p>}
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Pregunta:</label>
//           <input 
//             type="text" 
//             value={pregunta} 
//             onChange={(e) => setPregunta(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Opciones (separadas por comas):</label>
//           <input 
//             type="text" 
//             value={opciones} 
//             onChange={(e) => setOpciones(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Respuesta Correcta:</label>
//           <input 
//             type="text" 
//             value={respuestaCorrecta} 
//             onChange={(e) => setRespuestaCorrecta(e.target.value)} 
//             required 
//           />
//         </div>
//         <button className="form-button" type="submit">Crear Quiz</button>
//       </form>
//     </div>
//   );
// };

// export default CreateQuizForm;
