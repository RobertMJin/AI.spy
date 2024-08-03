import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
  <button
    className="relative right-0 bg-gray-700 hover:bg-gray-600 text-white text-xl py-2 px-4"
    onClick={() => loginWithRedirect()}>
    Log In
  </button>);
};

export default LoginButton;