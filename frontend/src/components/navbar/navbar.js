import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  return (
    <div className="absolute w-full z-1 l-0 t-0 bg-black flex flex-row items-left">
      <div
        className="font-compactRound bg-black py-2 px-4 text-center text-white hover:bg-gray-600 basis-1/10 cursor-pointer text-xl"
        onClick={() => navigate('/')}
      >Home
      </div>
      <div
        className="font-compactRound by-black round py-2 px-4 text-center text-white hover:scale-110 hover:bg-gray-800 basis-1/10 cursor-pointer text-xl"
        onClick={() => navigate('/lobby')}
      >Play
      </div>
      <div
        className="font-compactRound bg-black py-2 px-4 text-center text-white hover:scale-110 hover:bg-gray-800 basis-1/10 cursor-pointer text-xl"
        onClick={() => navigate('/detect')}
      >Detect
      </div>
      <div
        className="font-compactRound bg-black py-2 px-4 text-center text-white hover:scale-110 hover:bg-gray-800 basis-1/10 cursor-pointer text-xl"
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