import {
  RouterProvider,
} from 'react-router-dom';
import Router from './routes';
import { store, persistor } from './infrastructure/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <RouterProvider router={Router} />
      </PersistGate>

    </Provider>
  )
}

export default App
