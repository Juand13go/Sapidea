// BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección
import './FormStyles.css'; // Archivo CSS para estilos consistentes

const BackButton = () => {
  const navigate = useNavigate(); 

  return (
    <button className="form-button" onClick={() => navigate('/')}>
      Volver
    </button>
  );
};

export default BackButton;