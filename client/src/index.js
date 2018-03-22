import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './store/configureStore.js';
import App from './App.jsx';
const store = configureStore();

render( 
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('app'));
