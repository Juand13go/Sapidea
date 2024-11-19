// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import CreateLessonForm from './CreateLessonForm';

// const CourseDetails = () => {
//   const { cursoId } = useParams(); // Obtiene el cursoId de la URL
//   const [curso, setCurso] = useState(null);
//   const [lecciones, setLecciones] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCurso = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No hay token disponible. Por favor, inicia sesión.');
//         return;
//       }

//       try {
//         // Obtiene los detalles del curso
//         const response = await fetch(`http://127.0.0.1:5000/cursos/${cursoId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setCurso(data);
//         } else {
//           setError('Error al cargar los detalles del curso');
//         }
//       } catch (error) {
//         setError('Error en la conexión: ' + error.message);
//       }
//     };

//     const fetchLecciones = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No hay token disponible. Por favor, inicia sesión.');
//         return;
//       }

//       try {
//         // Obtiene las lecciones asociadas al curso
//         const response = await fetch(`http://127.0.0.1:5000/cursos/${cursoId}/lecciones`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setLecciones(data);
//         } else {
//           setError('Error al cargar las lecciones del curso');
//         }
//       } catch (error) {
//         setError('Error en la conexión: ' + error.message);
//       }
//     };

//     fetchCurso();
//     fetchLecciones();
//   }, [cursoId]);

//   return (
//     <div>
//       <h1>Detalles del Curso</h1>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {curso ? (
//         <div>
//           <h2>{curso.nombre}</h2>
//           <p>{curso.descripcion}</p>
          
//           <h3>Lecciones</h3>
//           {lecciones.length > 0 ? (
//             <ul>
//               {lecciones.map((leccion) => (
//                 <li key={leccion.id}>
//                   <h4>{leccion.titulo}</h4>
//                   <p>{leccion.contenido}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No hay lecciones disponibles para este curso.</p>
//           )}
          
//           {/* Pasa el cursoId al componente CreateLessonForm */}
//           <CreateLessonForm cursoId={cursoId} />
//         </div>
//       ) : (
//         <p>Cargando detalles del curso...</p>
//       )}
//     </div>
    
//   );
// };

// export default CourseDetails;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateLessonForm from './CreateLessonForm';

const CourseDetails = () => {
  const { cursoId } = useParams(); // Obtiene el cursoId de la URL
  const [curso, setCurso] = useState(null);
  const [lecciones, setLecciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurso = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay token disponible. Por favor, inicia sesión.');
        return;
      }

      try {
        // Obtiene los detalles del curso
        const response = await fetch(`http://127.0.0.1:5000/cursos/${cursoId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurso(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error al cargar los detalles del curso');
        }
      } catch (error) {
        setError('Error en la conexión: ' + error.message);
      }
    };

    const fetchLecciones = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay token disponible. Por favor, inicia sesión.');
        return;
      }

      try {
        // Obtiene las lecciones asociadas al curso
        const response = await fetch(`http://127.0.0.1:5000/cursos/${cursoId}/lecciones`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLecciones(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error al cargar las lecciones del curso');
        }
      } catch (error) {
        setError('Error en la conexión: ' + error.message);
      }
    };

    fetchCurso();
    fetchLecciones();
  }, [cursoId]);

  return (
    <div>
      <h1>Detalles del Curso</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {curso ? (
        <div>
          <h2>{curso.nombre}</h2>
          <p>{curso.descripcion}</p>
          
          <h3>Lecciones</h3>
          {lecciones.length > 0 ? (
            <ul>
              {lecciones.map((leccion) => (
                <li key={leccion.id}>
                  <h4>{leccion.titulo}</h4>
                  <p>{leccion.contenido}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay lecciones disponibles para este curso.</p>
          )}
          
          {/* Pasa el cursoId al componente CreateLessonForm */}
          <CreateLessonForm cursoId={cursoId} />
        </div>
      ) : (
        <p>Cargando detalles del curso...</p>
      )}
    </div>
  );
};

export default CourseDetails;
