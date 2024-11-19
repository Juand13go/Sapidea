import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestDB() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/test-db')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al conectar con el backend:', error);
      });
  }, []);

  return (
    <div>
      <h1>Usuarios registrados:</h1>
      {usuarios.length > 0 ? (
        <ul>
          {usuarios.map((usuario, index) => (
            <li key={index}>{usuario}</li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
}

export default TestDB;
