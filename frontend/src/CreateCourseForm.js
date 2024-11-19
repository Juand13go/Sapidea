import React, { useState } from 'react';
import axios from 'axios';

const CreateCourseForm = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [grado, setGrado] = useState('');
  const [materia, setMateria] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [courseId, setCourseId] = useState(''); // Nuevo estado para el ID del curso

  const handleCrearCurso = async (e) => {
    e.preventDefault();
    setMensaje(''); // Limpiar mensaje antes de procesar
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMensaje('Usuario no autenticado. Por favor, inicia sesión.');
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:5000/cursos',
        { nombre, descripcion, grado, materia },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 && response.data.id) {
        setMensaje('Curso creado exitosamente.');
        setCourseId(response.data.id); // Establecer el ID del curso creado
        setNombre('');
        setDescripcion('');
        setGrado('');
        setMateria('');
      } else {
        setMensaje(response.data.message || 'Error al crear el curso.');
      }
    } catch (error) {
      setMensaje(
        error.response?.data?.message || 'Error al crear el curso. Intenta nuevamente.'
      );
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Crear Curso</h2>
      <form onSubmit={handleCrearCurso}>
        <div>
          <label>Nombre del curso:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción del curso:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
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
        <div>
          <label>Materia:</label>
          <select
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            required
          >
            <option value="">Seleccionar Materia</option>
            <option value="matematicas">Matemáticas</option>
            <option value="ciencias-naturales">Ciencias Naturales</option>
            <option value="lenguaje">Lenguaje</option>
            <option value="ciencias-sociales">Ciencias Sociales</option>
            <option value="ingles">Inglés</option>
            <option value="quimica">Química</option>
            <option value="fisica">Física</option>
            <option value="biologia">Biología</option>
          </select>
        </div>
        <button type="submit">Crear Curso</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      {courseId && <p>ID del curso creado: {courseId}</p>} {/* Mostrar el ID del curso */}
    </div>
  );
};

export default CreateCourseForm;


