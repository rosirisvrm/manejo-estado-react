import './App.css';
import { UseState } from './UseState'
import { UseReducer } from './UseReducer'
import { ClassState } from './ClassState'

function App() {
  return (
    <div className="App">
      <UseState name='Use State' />
      <UseReducer name='Use Reducer' />
      <ClassState name='Class State' />
    </div>
  );
}

export default App;
