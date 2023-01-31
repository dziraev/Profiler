import { Router } from './Router';
import { Provider } from 'react-redux';
import store from '../redux/redux-store';

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
};

export default App;
