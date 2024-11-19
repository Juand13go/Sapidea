// import React, { useEffect, useState } from 'react';
// import './Profile.css';

// function Profile() {
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     // Suponiendo que hay una API para obtener la información del usuario
//     fetch('http://localhost:5000/profile', {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     .then(response => response.json())
//     .then(data => setUserInfo(data))
//     .catch(error => console.error('Error al obtener el perfil:', error));
//   }, []);

//   return (
//     <div className="profile-container">
//       {userInfo ? (
//         <div>
//           <h1>Perfil de {userInfo.username}</h1>
//           <p>Rol: {userInfo.rol}</p>
//           <h2>Tus Cursos</h2>
//           <ul>
//             {userInfo.cursos.map((curso, index) => (
//               <li key={index}>{curso.nombre}</li>
//             ))}
//           </ul>
//           <h2>Progreso</h2>
          
//           <div className="progress-bar">
//             <div className="progress" style={{ width: `${userInfo.progreso}%` }}></div>
//           </div>

//           <p>{userInfo.progreso}% completado</p>
//         </div>
//       ) : (
//         <p>Cargando...</p>
//       )}
//     </div>
//   );
// }

// export default Profile;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Para la navegación
import './Profile.css';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Por favor, inicia sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    fetch('http://localhost:5000/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil.');
        }
        return response.json();
      })
      .then((data) => setUserInfo(data))
      .catch((error) => {
        console.error('Error al obtener el perfil:', error);
        setError('No se pudo cargar la información del perfil.');
      });
  }, [navigate]);

  return (
    <div className="profile-container">
      <Link to="/" className="back-button">
        Volver
      </Link>
      {error ? (
        <p className="error-message">{error}</p>
      ) : userInfo ? (
        <div className="profile-content">
          <h1 className="profile-title">Perfil de {userInfo.username}</h1>
          <p className="profile-role">Rol: {userInfo.rol}</p>
          <h2 className="profile-section-title">Tus Cursos</h2>
          <ul className="profile-courses">
            {userInfo.cursos.map((curso, index) => (
              <li key={index} className="profile-course-item">
                {curso.nombre}
              </li>
            ))}
          </ul>
          <h2 className="profile-section-title">Progreso</h2>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${userInfo.progreso}%` }}
            ></div>
          </div>
          <p className="progress-text">{userInfo.progreso}% completado</p>
        </div>
      ) : (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando información del perfil...</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
