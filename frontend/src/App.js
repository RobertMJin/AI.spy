import './App.css';
import util from './components/modelStuff.js'

import Navbar from './components/navbar.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Game from './components/game.js'
import Report from './components/report.js';

const {modelInitializer, ModelDisplay} = util;

const ModelData = util.modelInitializer(ModelDisplay)


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
      <ModelData />
    </div>
  );
}

export default App;
