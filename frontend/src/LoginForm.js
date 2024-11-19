import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log("Datos enviados:", { username, password });

      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        console.log('Login exitoso:', data);
        window.location.href = '/';
      } else {
        setError('Credenciales inválidas');
        console.error("Error de autenticación: ", response.statusText);
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      setError('Error en la conexión, intenta nuevamente.');
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label className="login-form-label">Usuario:</label>
          <input
            type="text"
            className="login-form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label className="login-form-label">Contraseña:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>
        <button type="submit" className="login-form-button">Login</button>
        {error && <p className="login-form-error">{error}</p>}
      </form>

      <div className="login-form-links">
        <p className="login-form-register">
          ¿No tienes cuenta aún? <Link to="/register" className="login-form-link">Regístrate aquí</Link>
        </p>
      {/* <button
      onClick={() => window.location.href = 'http://localhost:5000/login/google'}
      className="login-form-button"
      >
      Acceder con Google
      </button> */}

        {/* Botón para redirigir a "Olvidaste tu contraseña" */}
        {/* <p className="login-form-forgot-password">
          <button 
            className="forgot-password-button" 
            onClick={() => navigate('/forgot-password')}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p> */}
      </div>
    </div>
  );
}

export default LoginForm;
