import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';

function Home() {
  return (
    <body className="body">
      <div className="home-container">
        <Navbar />
        <div className="home-content">
          <h1 className="home-title">Bienvenido a Sapidea</h1>
          <p className="home-description">
            Explora nuestros cursos más populares y comienza tu aprendizaje hoy mismo.
          </p>

          <div className="courses-section">
            <h2 className="courses-title">Cursos Populares</h2>
            <div className="courses-list">
              <div className="course-card">
                <video className="course-video" controls>
                  <source src="/videos/matematicas.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="course-card">
                <video className="course-video" controls>
                  <source src="/videos/robotica.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="course-card">
                <video className="course-video" controls>
                  <source src="/videos/video_programacion.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <Link to="/cursos-populares" className="explore-button">
            Explorar más Cursos
          </Link>
        </div>
      </div>
    </body>
  );
}

export default Home;
