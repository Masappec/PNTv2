import {
  RouterProvider,
} from 'react-router-dom';
import Router from './routes';
import { store } from './infrastructure/Store';
import { Provider } from 'react-redux';

function App() {

  return (
    <Provider store={store}>

      <RouterProvider router={Router} />
    </Provider>
  )
}

export default App
