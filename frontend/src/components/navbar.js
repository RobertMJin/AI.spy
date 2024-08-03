import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  
  return (
    <div>
      {
      isAuthenticated ? <LogoutButton /> : <LoginButton />
      }
    </div>
  );
};

export default Navbar;