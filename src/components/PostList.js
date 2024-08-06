import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <div style={styles.postList}>
      {posts.map(post => (
        <div key={post.id} style={styles.post}>
          <div style={styles.postHeader}>
            <div style={styles.postUserName}>{post.userName}</div>
            <div style={styles.postDate}>
              {new Date(post.createdAt.seconds * 1000).toLocaleDateString()} a las {new Date(post.createdAt.seconds * 1000).toLocaleTimeString()}
            </div>
          </div>
          <div style={styles.postContent}>{post.content}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  postList: {
    marginTop: '20px',
  },
  post: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  postDate: {
    fontSize: '14px',
    color: '#888',
  },
  postContent: {
    fontSize: '16px',
  },
};

export default PostList;
