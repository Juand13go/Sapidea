// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const InscribirCursoForm = () => {
//   const [cursos, setCursos] = useState([]);

//   useEffect(() => {
//     const fetchCursos = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No se encontró el token');
//           return;
//         }

//         console.log('Token JWT:', token);  // Verificar el token antes de enviar la solicitud

//         const response = await axios.get('http://127.0.0.1:5000/cursos', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCursos(response.data);
//       } catch (error) {
//         console.error('Error al cargar los cursos:', error);
//       }
//     };

//     fetchCursos();
//   }, []);

//   return (
//     <div>
//       <h2>Cursos disponibles</h2>
//       <ul>
//         {cursos.map((curso) => (
//           <li key={curso.id}>{curso.nombre}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default InscribirCursoForm;
