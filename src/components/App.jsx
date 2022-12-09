import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Provider } from 'react-redux';
import store from '../redux/redux-store';
//import itemReducer from "./components/itemReducer.js";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
