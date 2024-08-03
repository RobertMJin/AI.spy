import logo from './logo.svg';
import './App.css';
import util from './components/modelStuff.js'

const {modelInitializer, ModelDisplay} = util;

const ModelData = util.modelInitializer(ModelDisplay)


function App() {
  return (
    <div className="App">
      <ModelData/>
      
    </div>
  );
}

export default App;
