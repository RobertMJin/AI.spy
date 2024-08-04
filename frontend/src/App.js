import './App.css';
import util from './components/modelStuff.js'
import Navbar from './components/navbar/navbar.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';


import Profile from './components/game/profile.js'
import Home from './pages/home.js'
import Detect from './pages/detect.js'
import Game from './pages/game.js'
import Report from './pages/report.js';
import Lobby from './pages/lobby.js';

const {modelInitializer, ModelDisplay} = util;

const ModelData = util.modelInitializer(ModelDisplay)

const Test = () => {
  const { isLoading, isAuthenticated, error, user } = useAuth0();
  useEffect(() => {
    if (isLoading) return;
    console.log(isAuthenticated, user, error);
  }, [isLoading, isAuthenticated, user, error]);
  return null;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Test/>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />} />
          <Route
            path="/detect"
            element={<Detect />} />
          <Route
            path="/game"
            element={<Game />} />
          <Route
            path="/report"
            element={<Report />}/>
          <Route
            path='/lobby'
            element={<Lobby />} />
        </Routes>
      </Router>
      <ModelData />
    </div>
  );
}

export default App;
