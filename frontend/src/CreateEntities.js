import React, { useState } from 'react';
import axios from 'axios';
import './FormStyles.css'; // Archivo CSS para estilos consistentes

const CreateEntities = () => {
  const [activeTab, setActiveTab] = useState('curso'); // Tab activa
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    grado: '',
    materia: '',
    cursoId: '',
    tituloLeccion: '',
    contenidoLeccion: '',
    videoUrl: '',
    preguntaQuiz: '',
    respuestaCorrectaQuiz: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [createdCourseId, setCreatedCourseId] = useState(null); // Estado para el ID del curso creado
  const [nuevaOpcion, setNuevaOpcion] = useState(''); // Estado para una nueva opción individual
  const [opcionesQuiz, setOpcionesQuiz] = useState([]); // Estado para las opciones agregadas

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOption = () => {
    if (nuevaOpcion.trim() !== '') {
      setOpcionesQuiz([...opcionesQuiz, nuevaOpcion.trim()]);
      setNuevaOpcion(''); // Limpiar el campo de entrada después de agregar la opción
    }
  };

  const handleRemoveOption = (index) => {
    const opcionesActualizadas = opcionesQuiz.filter((_, i) => i !== index);
    setOpcionesQuiz(opcionesActualizadas);
  };

  // Función para verificar y obtener el token
  const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Por favor, inicia sesión.');
      window.location.href = '/login';
      return null;
    }
    return token;
  };

  // Submit para crear un curso
  const handleSubmitCurso = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setCreatedCourseId(null); // Reiniciar el ID del curso creado

    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/cursos',
        {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          grado: formData.grado,
          materia: formData.materia,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setMessage('Curso creado exitosamente.');
        setCreatedCourseId(response.data.id); // Guardar el ID del curso creado
        setFormData({
          ...formData,
          nombre: '',
          descripcion: '',
          grado: '',
          materia: '',
        });
      }
    } catch (error) {
      handleError(error, 'Error al crear el curso.');
    }
  };

  // Submit para crear una lección
  const handleSubmitLeccion = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = getToken();
    if (!token) return;

    if (!formData.cursoId) {
      setError('Por favor, ingresa el ID del curso.');
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/cursos/${formData.cursoId}/lecciones`,
        {
          titulo: formData.tituloLeccion,
          contenido: formData.contenidoLeccion,
          video_url: formData.videoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setMessage('Lección creada exitosamente.');
        setFormData({
          ...formData,
          tituloLeccion: '',
          contenidoLeccion: '',
          videoUrl: '',
          cursoId: '',
        });
      }
    } catch (error) {
      handleError(error, 'Error al crear la lección.');
    }
  };

  // Submit para crear un quiz
  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = getToken();
    if (!token) return;

    if (!formData.cursoId) {
      setError('Por favor, ingresa el ID del curso.');
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/cursos/${formData.cursoId}/quizzes`,
        {
          pregunta: formData.preguntaQuiz,
          opciones: opcionesQuiz, // Enviar el array de opciones directamente
          respuesta_correcta: formData.respuestaCorrectaQuiz,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setMessage('Quiz creado exitosamente.');
        setFormData({
          ...formData,
          preguntaQuiz: '',
          respuestaCorrectaQuiz: '',
        });
        setOpcionesQuiz([]); // Limpiar las opciones después de crear el quiz
      }
    } catch (error) {
      handleError(error, 'Error al crear el quiz.');
    }
  };

  const handleError = (error, defaultMessage) => {
    if (error.response && error.response.status === 401) {
      setError('Token inválido o expirado. Redirigiendo al login...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      setError(defaultMessage);
    }
  };

  return (
    <div className="form-container">
      <h2>Gestión de Entidades</h2>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'curso' ? 'active' : ''}`}
          onClick={() => setActiveTab('curso')}
        >
          Crear Curso
        </button>
        <button
          className={`tab ${activeTab === 'leccion' ? 'active' : ''}`}
          onClick={() => setActiveTab('leccion')}
        >
          Crear Lección
        </button>
        <button
          className={`tab ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Crear Quiz
        </button>
      </div>

      {message && <p className="form-message success">{message}</p>}
      {error && <p className="form-message error">{error}</p>}
      {createdCourseId && <p className="form-message success">ID del curso creado: {createdCourseId}</p>}

      {activeTab === 'curso' && (
        <form className="form" onSubmit={handleSubmitCurso}>
          <div className="form-group">
            <label>Nombre del curso:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Grado:</label>
            <select
              name="grado"
              value={formData.grado}
              onChange={handleChange}
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
              name="materia"
              value={formData.materia}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar Materia</option>
              <option value="matematicas">Matemáticas</option>
              <option value="naturales">Ciencias Naturales</option>
              {/* <option value="ciencias-naturales">Ciencias Naturales</option> */}
              <option value="lenguaje">Lenguaje</option>
              <option value="sociales">Ciencias Sociales</option>
              {/* <option value="ciencias-sociales">Ciencias Sociales</option> */}
              <option value="ingles">Inglés</option>
              <option value="quimica">Química</option>
              <option value="fisica">Física</option>
              <option value="biologia">Biología</option>
            </select>
          </div>
          <button className="form-button" type="submit">Crear Curso</button>
        </form>
      )}

      {activeTab === 'leccion' && (
        <form className="form" onSubmit={handleSubmitLeccion}>
          <div className="form-group">
            <label>ID del Curso:</label>
            <input
              type="text"
              name="cursoId"
              value={formData.cursoId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Título de la Lección:</label>
            <input
              type="text"
              name="tituloLeccion"
              value={formData.tituloLeccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contenido de la Lección:</label>
            <textarea
              name="contenidoLeccion"
              value={formData.contenidoLeccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>URL del Video:</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              required
            />
          </div>
          <button className="form-button" type="submit">Crear Lección</button>
        </form>
      )}

      {activeTab === 'quiz' && (
        <form className="form" onSubmit={handleSubmitQuiz}>
    <div className="form-group">
      <label>ID de la lección:</label>
      <input
        type="text"
        name="cursoId"
        value={formData.cursoId}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label>Pregunta:</label>
      <input
        type="text"
        name="preguntaQuiz"
        value={formData.preguntaQuiz}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label>Nueva Opción:</label>
      <input
        type="text"
        value={nuevaOpcion}
        onChange={(e) => setNuevaOpcion(e.target.value)}
      />
      <button type="button" onClick={handleAddOption}>Agregar Opción</button>
    </div>
    <div className="form-group">
      <label>Opciones Agregadas:</label>
      <ul>
        {opcionesQuiz.map((opcion, index) => (
          <li key={index}>
            {opcion}
            <button type="button" onClick={() => handleRemoveOption(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
    <div className="form-group">
      <label>Respuesta Correcta:</label>
      <input
        type="text"
        name="respuestaCorrectaQuiz"
        value={formData.respuestaCorrectaQuiz}
        onChange={handleChange}
        required
      />
    </div>
    <button className="form-button" type="submit">Crear Quiz</button>          
    </form>
      )}

      <button onClick={() => window.history.back()} className="back-button">
        Volver
      </button>
    </div>
  );
};

export default CreateEntities;
