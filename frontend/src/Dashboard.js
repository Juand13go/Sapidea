import React, { useState, useEffect } from 'react';
// import CreateLessonForm from './CreateLessonForm';
// import CreateQuizForm from './CreateQuizForm';
// import InscribirCursoForm from './InscribirCursoForm';
import './Dashboard.css';

// Función para decodificar el token JWT manualmente
function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error al decodificar el token:', e);
    return null;
  }
}

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [cursoId, setCursoId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const userInfo = decodeToken(token);
    if (userInfo) {
      setUsuario(userInfo.sub); // userInfo.sub contiene la info del usuario
      setCursoId(1); // Cambiar por el ID real del curso o obtenerlo de una API
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bienvenido!</h1>

      {usuario ? (
        <div className="user-info">
          <p className="user-welcome">Hola, <span>{usuario.username}</span>!</p>
          <p className="user-role">Tu rol: <span>{usuario.rol}</span></p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Dashboard;
