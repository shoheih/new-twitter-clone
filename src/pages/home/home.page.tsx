import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
  const auth = useAuth();

  return (
    <div>
      <h1>Home</h1>
      {auth.user ? (
        <>
          <button onClick={auth.signOut}>Sign Out</button>
          <p>{auth.user.email}</p>
          <p>{auth.user.photoURL}</p>
          <img src={auth.user.photoURL} alt="photo" />
        </>
      ) : (
        <button onClick={auth.signInWithGoogle}>Sign In With Google</button>
      )}
    </div>
  );
};

export default Home;
