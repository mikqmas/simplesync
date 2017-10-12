import React from 'react';
import ReactDOM from 'react-dom';

// import getTodos from './util/todo_api_util'
import configureStore from './store/store';
import PreLanded from './components/app';
import Landed from './components/landed';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {user: {current_user: window.currentUser}};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  const preLanded = (
    <BrowserRouter>
      <Provider store={store}>
          <PreLanded/>
      </Provider>
    </BrowserRouter>
  )

  const landed = (
    <BrowserRouter>
      <Provider store={store}>
          <Landed/>
      </Provider>
    </BrowserRouter>
  );

  window.store = store;
  const rootElement = document.getElementById('content');
  if(store.getState().user.current_user) {
    ReactDOM.render(landed, rootElement);
  }else {
    ReactDOM.render(preLanded, rootElement);
  }
})
