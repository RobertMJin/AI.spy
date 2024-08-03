import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-700 flex flex-row items-left">
      <div
        className="bg-gray-700 py-2 px-4 text-center text-white hover:bg-gray-600 basis-1/10 cursor-pointer text-xl"
        onClick={() => navigate('/')}
      >Home
      </div>
      <div
        className="bg-gray-700 py-2 px-4 text-center text-white hover:bg-gray-600 basis-1/10 cursor-pointer text-xl"
        onClick={() => navigate('/lobby')}
      >Play
      </div>
      <div
        className="bg-gray-700 py-2 px-4 text-center text-white hover:bg-gray-600 basis-1/10 cursor-pointer text-xl"
        onClick={() => navigate('/detect')}
      >Detect
      </div>
      <div
        className="bg-gray-700 py-2 px-4 text-center text-white hover:bg-gray-600 basis-1/10 cursor-pointer text-xl"
        onClick={() => navigate('/report')}
      >Report
      </div>
      <div
        className="grow flex">
        <div className="grow"></div>
        {
          isAuthenticated ? <LogoutButton />
          : <LoginButton />
        }
      </div>
    </div>
  );
};

export default Navbar;