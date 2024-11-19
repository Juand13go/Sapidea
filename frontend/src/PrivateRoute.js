// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Suponiendo que tienes una función o contexto que verifica la autenticación
const isAuthenticated = () => {
  // Lógica para verificar si el usuario está autenticado
  // Por ejemplo, podrías verificar un token en el localStorage
  const token = localStorage.getItem('token');
  return token !== null; // o cualquier lógica que uses para determinar la autenticación
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
