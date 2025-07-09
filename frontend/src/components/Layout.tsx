import React, { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="custom-bootstrap-menu">
        <div className="container d-flex align-items-center">
          <a href="https://www.instagram.com/fundacionformar/?hl=es" className="me-3" target='blank'>
            <img src="/images/formar.png" alt="Formar Argentina Logo" className="navbar-logo" />
          </a>
          <a href="https://forit.ar" target='blank'>
            <img src="/images/forIT.png" alt="ForIT Logo" className="navbar-logo" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link hvr-underline-reveal" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link hvr-underline-reveal" href="/tasks/new">New Task</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-4" style={{ paddingTop: '70px', paddingBottom: '50px' }}>
        {children}
      </main>

      <footer className="bg-light text-center text-white mt-auto fixed-bottom">
        <div className="container p-2 pb-0">
          <section className="mb-2">
            <a
              className="btn social-btn"
              style={{ backgroundColor: '#110A26' }}
              href="https://forit.ar"
              role="button"
              target='blank'
            >
              <img
                src="/images/icon-forit.svg"
                alt="ForIT Icon"
                style={{ height: '20px' }}
              />
            </a>

            {/*
            <a
              className="btn social-btn"
              style={{ backgroundColor: '#dd4b39' }}
              href="#!"
              role="button"
            >
              <i className="bi bi-envelope-fill"></i>
            </a>

            <a
              className="btn social-btn"
              style={{ backgroundColor: '#0082ca' }}
              href="#!"
              role="button"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            */}

            <a
              className="btn social-btn"
              style={{ backgroundColor: '#333333' }}
              href="https://github.com/manita02/AcademiaForITChallengue"
              target='blank'
              role="button"
            >
              <i className="bi bi-github"></i>
            </a>
          </section>
        </div>

        <div
          className="text-center p-2"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          <div className="fw-bold">© 2025 Academia ForIT</div>
          <div className="fst-italic">Desarrollado por Ana Lucia Juarez</div>
        </div>

      </footer>
    </div>
  );
};

export default Layout;