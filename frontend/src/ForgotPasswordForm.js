import React, { useState } from 'react';
import axios from 'axios';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simular el envío de un correo de restablecimiento
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error al solicitar restablecimiento de contraseña:', error);
      setMessage('Hubo un error al procesar la solicitud.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar correo de restablecimiento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPasswordForm;
