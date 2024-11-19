import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAuthCode, setShowAuthCode] = useState(false); // Estado para el código de autorización
  const [rol, setRol] = useState('estudiante');
  const [authCode, setAuthCode] = useState('');
  const [message, setMessage] = useState('');
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setEyePosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación de claves específicas para cada rol
    if ((rol === 'profesor' && authCode !== 'JIJJ') || (rol === 'admin' && authCode !== '02212418')) {
      setMessage('Código de autorización incorrecto');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rol }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Registro exitoso');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(data.message || 'Error en el registro');
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="background-animated">
      <div className="register-container">
        <div className="character">
          <div
            className="eye left-eye"
            style={{
              transform: `translate(${eyePosition.x * 0.02}px, ${eyePosition.y * 0.02}px)`,
            }}
          ></div>
          <div
            className="eye right-eye"
            style={{
              transform: `translate(${eyePosition.x * 0.02}px, ${eyePosition.y * 0.02}px)`,
            }}
          ></div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <select
              name="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="register-form-select"
            >
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {(rol === 'profesor' || rol === 'admin') && (
            <div className="register-form-group">
              <div className="password-input-container">
                <input
                  type={showAuthCode ? 'text' : 'password'}
                  placeholder="Código de autorización"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="register-form-input"
                />
                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={() => setShowAuthCode(!showAuthCode)}
                >
                  {showAuthCode ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          )}

          <div className="register-form-group">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-form-input"
              required
            />
          </div>

          <div className="register-form-group">
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-form-input"
                required
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="register-form-button">
            Registrar
          </button>
          {message && <p className="register-form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
