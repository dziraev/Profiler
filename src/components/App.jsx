import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
