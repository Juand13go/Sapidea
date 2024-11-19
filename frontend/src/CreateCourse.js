import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate de React Router
import './FormStyles.css'; // Archivo CSS para estilos consistentes

const CreateCourse = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [grado, setGrado] = useState('');
  const [materia, setMateria] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Usar useNavigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Token no encontrado. Por favor, inicia sesión.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, descripcion, grado, materia }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Curso creado exitosamente. ID del curso: ${data.id}`);
        setNombre('');
        setDescripcion('');
        setGrado('');
        setMateria('');
      } else if (response.status === 401) {
        setMessage('Token inválido o expirado. Redirigiendo al login...');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error al crear el curso');
      }
    } catch (error) {
      setMessage('Error en la conexión, intenta nuevamente.');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear un nuevo curso</h2>
      
      {/* Botón de Volver */}
      <button className="back-button" onClick={() => navigate('/')}>
        Volver
      </button>
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del curso:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Grado:</label>
          <select
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            required
          >
            <option value="">Seleccionar Grado</option>
            <option value="preescolar">Preescolar</option>
            <option value="primero">Primero</option>
            <option value="segundo">Segundo</option>
            <option value="tercero">Tercero</option>
            <option value="cuarto">Cuarto</option>
            <option value="quinto">Quinto</option>
            <option value="sexto">Sexto</option>
            <option value="septimo">Séptimo</option>
            <option value="octavo">Octavo</option>
            <option value="noveno">Noveno</option>
            <option value="decimo">Décimo</option>
            <option value="once">Once</option>
          </select>
        </div>
        <div className="form-group">
          <label>Materia:</label>
          <select
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            required
          >
            <option value="">Seleccionar Materia</option>
            <option value="matematicas">Matemáticas</option>
            <option value="ciencias">Ciencias</option>
            <option value="lenguaje">Lenguaje</option>
            <option value="sociales">Sociales</option>
            <option value="ingles">Inglés</option>
          </select>
        </div>
        <button className="form-button" type="submit">Crear Curso</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default CreateCourse;
