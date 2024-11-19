import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Courses from './Courses';
import Home from './Home';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import CourseDetails from './CourseDetails';
import Grados from './Grados';
import Materias from './Materias';
import Lecciones from './Lecciones';
import LeccionDetalle from './LeccionDetalle';
import CreateEntities from './CreateEntities';
import Quizzes from './Quizzes';  
import CursosPopulares from './CursosPopulares';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/courses" element={isAuthenticated() ? <Courses /> : <Navigate to="/login" />} />
        <Route path="/grados/:grado" element={isAuthenticated() ? <Grados /> : <Navigate to="/login" />} />
        <Route path="/materias/:grado/:materia" element={isAuthenticated() ? <Materias /> : <Navigate to="/login" />} />
        <Route path="/cursos/:grado/:materia" element={isAuthenticated() ? <Courses /> : <Navigate to="/login" />} />
        <Route path="/cursos/:grado/:materia/:curso" element={isAuthenticated() ? <Lecciones /> : <Navigate to="/login" />} />
        <Route path="/curso/:cursoId" element={isAuthenticated() ? <CourseDetails /> : <Navigate to="/login" />} />
        <Route path="/leccion/:leccionId" element={isAuthenticated() ? <LeccionDetalle /> : <Navigate to="/login" />} />
        <Route path="/create_entities" element={isAuthenticated() ? <CreateEntities /> : <Navigate to="/login" />} />
        <Route path="/quizzes/:leccionId" element={isAuthenticated() ? <Quizzes /> : <Navigate to="/login" />} />
        <Route path="/cursos-populares" element={isAuthenticated() ? <CursosPopulares /> : <Navigate to="/login" />} />

      </Routes>

    </Router>
  );
}

export default App;