import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
      });

      navigate('/');
    } catch (error) {
      console.error("Error al registrar el usuario:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Registrarse</h2>
      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Apellido"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        style={styles.input}
      />
      <button onClick={handleRegister} style={styles.button}>Registrarse</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  heading: {
    marginBottom: '15px',
    fontSize: '22px',
    color: '#007bff',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'block',
    width: '100%',
  },
};

export default Register;
