import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Quizzes.css';

const Quizzes = () => {
  const { leccionId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Por favor, inicia sesión.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/lecciones/${leccionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuizzes(data.quizzes || []);
        } else {
          setError('Error al cargar los quizzes.');
        }
      } catch (err) {
        setError('Error en la conexión: ' + err.message);
      }
    };

    fetchQuizzes();
  }, [leccionId, navigate]);

  const handleOptionChange = (quizId, opcion) => {
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [quizId]: opcion,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Por favor, inicia sesión.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/quizzes/${leccionId}/validar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ respuestas }),
      });

      if (response.ok) {
        const data = await response.json();
        setResultados(data.resultados);
      } else {
        setError('Error al validar las respuestas.');
      }
    } catch (err) {
      setError('Error en la conexión: ' + err.message);
    }
  };

  return (
    <div className="quizzes-container">
      <h1>Quizzes</h1>
      {error && <p className="error">{error}</p>}

      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <h2>{quiz.pregunta}</h2>
            <ul>
              {quiz.opciones.map((opcion, index) => (
                <li key={index}>
                  <label>
                  {opcion}
                    <input
                      type="radio"
                      name={`quiz-${quiz.id}`}
                      value={opcion}
                      checked={respuestas[quiz.id] === opcion}
                      onChange={() => handleOptionChange(quiz.id, opcion)}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No hay quizzes disponibles para esta lección.</p>
      )}

      <button onClick={handleSubmit} className="submit-button">
        Enviar Respuestas
      </button>

      {resultados.length > 0 && (
        <div className="resultados-container">
          <h2>Resultados</h2>
          {resultados.map((resultado) => (
            <div key={resultado.id} className="resultado-card">
              <h3>{resultado.pregunta}</h3>
              <p>Tu respuesta: {resultado.respuesta_usuario || 'Sin responder'}</p>
              <p>Respuesta correcta: {resultado.respuesta_correcta}</p>
              <p>Resultado: {resultado.resultado}</p>
            </div>
          ))}
        </div>
      )}

      <button className="back-button" onClick={() => navigate('/')}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default Quizzes;
