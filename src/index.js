import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react';




ReactDOM.render(
  <Provider store={ store }> {/*Proveemos a la app la store: el estado de toda la aplicación */}
    <PersistGate loading="null" persistor={ persistor }>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


