import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MuroInteractivo</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Inicio</Link>
        {user ? (
          <>
            <Link to="/create-post" style={styles.link}>Crear Publicación</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/signup" style={styles.link}>Registrarse</Link>
            <Link to="/login" style={styles.link}>Iniciar Sesión</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#007bff',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    padding: '0 15px',
    fontSize: '18px',
  },
  logoutButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Navbar;
