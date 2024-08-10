import React from 'react';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('register'));

  const cartInitialState = JSON.parse(window.localStorage.getItem('register')) ||  JSON.parse(window.localStorage.getItem('login')) || []
  console.log(cartInitialState)
  
  return (
    <div >
      <h2>Perfil del Usuario </h2>
      <p>Usuario: {user.username}</p>
      <p><strong>Rol:</strong> {user.role}</p>
    </div>
  );
};

export default UserProfile;
