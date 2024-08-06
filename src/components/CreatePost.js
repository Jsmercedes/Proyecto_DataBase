import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [content, setContent] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const { firstName, lastName } = userDocSnap.data();
          const fullName = `${firstName} ${lastName}`;

          await addDoc(collection(db, "posts"), {
            content,
            userId: auth.currentUser.uid,
            userName: fullName,
            createdAt: new Date(),
          });

          setContent("");
          navigate('/'); 
        } else {
          console.error("No se encontró la información del usuario");
        }
      } catch (error) {
        console.error("Error al crear la publicación:", error);
      }
    } else {
      console.log("Usuario no autenticado");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Crear Publicación</h2>
      <textarea
        style={styles.textarea}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="¿Qué estás pensando?"
      ></textarea>
      <button onClick={handleCreatePost} style={styles.button}>Publicar</button>
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
  },
  heading: {
    marginBottom: '15px',
    fontSize: '22px',
  },
  textarea: {
    width: '100%',
    height: '80px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
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

export default CreatePost;
