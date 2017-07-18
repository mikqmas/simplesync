import React from 'react';
import ReactDOM from 'react-dom';

// import getTodos from './util/todo_api_util'
import configureStore from './store/store';
import App from './components/app';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

const store = configureStore();

const appRouter = (
  <BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
  </BrowserRouter>
);

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('content');
  ReactDOM.render(appRouter, rootElement);
})
