import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { Provider } from 'react-redux';
import store from '../redux/redux-store';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
