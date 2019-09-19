import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './store/root';
import App from './App';

const maxSnackCount = 3;

const Wrapper = (
  <Provider store={store}>
    <SnackbarProvider maxSnack={maxSnackCount}>
      <App />
    </SnackbarProvider>
  </Provider>
);

ReactDOM.render(Wrapper, document.getElementById('root'));
