import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
  <button
    className="font-compactRound relative right-10 bg-black hover:scale-110 hover:bg-gray-800 text-white text-xl py-2 px-4"
    onClick={() => loginWithRedirect()}>
    Log In
  </button>);
};

export default LoginButton;