// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// // Decodifica el token JWT
// const decodeToken = (token) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error('Error al decodificar el token:', error);
//     return null;
//   }
// };

// // Obtiene el rol del usuario a partir del token
// const obtenerRolUsuario = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return null;

//   const decodedToken = decodeToken(token);
//   return decodedToken?.sub?.rol || null;
// };

// // Convierte el nombre del grado a una URL amigable
// const convertirGradoAUrl = (grado) => {
//   return grado
//     .toLowerCase()
//     .replace('é', 'e')
//     .replace('ó', 'o')
//     .replace(/\s+/g, '-');
// };

// // Lista de grados
// const grados = [
//   'Preescolar', 'Primero', 'Segundo', 'Tercero', 'Cuarto',
//   'Quinto', 'Sexto', 'Séptimo', 'Octavo', 'Noveno',
//   'Décimo', 'Once',
// ];

// function Navbar() {
//   const rolUsuario = obtenerRolUsuario();
//   const [mostrarGrados, setMostrarGrados] = useState(false);
//   const [mostrarPerfil, setMostrarPerfil] = useState(false);

//   return (
//     <nav className="navbar">
//       <ul className="navbar-list">
//         {/* Mi Perfil */}
//         <li
//           className="navbar-item"
//           onMouseEnter={() => setMostrarPerfil(true)}
//           onMouseLeave={() => setMostrarPerfil(false)}
//         >
//           <Link to="/dashboard" className="navbar-link">Mi Perfil</Link>
//           {mostrarPerfil && (
//             <ul className="dropdown">
//               <li className="dropdown-item">
//                 <Link to="/dashboard" className="dropdown-link">Perfil</Link>
//               </li>
//               <li className="dropdown-item">
//                 <Link
//                   to="/login"
//                   className="dropdown-link"
//                   onClick={() => localStorage.removeItem('token')}
//                 >
//                   Cerrar Sesión
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>

//         {/* Inicio */}
//         <li className="navbar-item">
//           <Link to="/" className="navbar-link">Inicio</Link>
//         </li>

//         {/* Grados */}
//         <li
//           className="navbar-item"
//           onMouseEnter={() => setMostrarGrados(true)}
//           onMouseLeave={() => setMostrarGrados(false)}
//         >
//           <Link to="#" className="navbar-link">Grados</Link>
//           {mostrarGrados && (
//             <ul
//               className="dropdown"
//               onMouseEnter={() => setMostrarGrados(true)}
//               onMouseLeave={() => setMostrarGrados(false)} // Mantén abierto mientras esté en el dropdown
//             >
//               {grados.map((grado, index) => (
//                 <li key={index} className="dropdown-item">
//                   <Link
//                     to={`/grados/${convertirGradoAUrl(grado)}`}
//                     className="dropdown-link"
//                   >
//                     {grado}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>

//         {/* Crear (Solo para admin y profesor) */}
//         {(rolUsuario === 'admin' || rolUsuario === 'profesor') && (
//           <li className="navbar-item">
//             <Link to="/create_entities" className="navbar-link">Crear</Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Decodifica el token JWT
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

// Obtiene el rol del usuario a partir del token
const obtenerRolUsuario = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decodedToken = decodeToken(token);
  return decodedToken?.sub?.rol || null;
};

// Convierte el nombre del grado a una URL amigable
const convertirGradoAUrl = (grado) => {
  return grado
    .toLowerCase()
    .replace('é', 'e')
    .replace('ó', 'o')
    .replace(/\s+/g, '-');
};

// Lista de grados
const grados = [
  'Preescolar', 'Primero', 'Segundo', 'Tercero', 'Cuarto',
  'Quinto', 'Sexto', 'Séptimo', 'Octavo', 'Noveno',
  'Décimo', 'Once',
];

function Navbar() {
  const rolUsuario = obtenerRolUsuario();
  const [mostrarGrados, setMostrarGrados] = useState(false);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <img
              src="/img/logo2.png" 
              alt="Inicio"
              className="navbar-logo"
            />
          </Link>
        </li>

        {/* Grados */}
        <li
          className="navbar-item" // Se asegura de que use la misma clase que los demás
          onMouseEnter={() => setMostrarGrados(true)}
          onMouseLeave={() => setMostrarGrados(false)}
        >
          <Link to="#" className="navbar-link">Grados</Link>
          {mostrarGrados && (
            <ul
              className="dropdown"
              onMouseEnter={() => setMostrarGrados(true)}
              onMouseLeave={() => setMostrarGrados(false)}
            >
              {grados.map((grado, index) => (
                <li key={index} className="dropdown-item">
                  <Link
                    to={`/grados/${convertirGradoAUrl(grado)}`}
                    className="dropdown-link"
                  >
                    {grado}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Crear (Solo para admin y profesor) */}
        {(rolUsuario === 'admin' || rolUsuario === 'profesor') && (
          <li className="navbar-item">
            <Link to="/create_entities" className="navbar-link">Crear</Link>
          </li>
        )}

        {/* Cerrar Sesión */}
        <li className="navbar-item">
          <Link
            to="/login"
            className="navbar-link" style={{marginLeft:'805px'}}
            onClick={() => localStorage.removeItem('token')}
          >
            Cerrar Sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
