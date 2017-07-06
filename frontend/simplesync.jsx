import React from 'react';
import ReactDOM from 'react-dom';

// import getTodos from './util/todo_api_util'
import configureStore from './store/store';
import App from './components/app';
import {Provider} from 'react-redux';
import {HashRouter, Route, Link, Switch} from 'react-router-dom';

//Router
// const IndexRoute = ReactRouter.IndexRoute;
// const HashRouter = ReactRouter.hashRouter;

const store = configureStore();

const appRouter = (
  // <Provider store={store}>
    <HashRouter>
      // <Route path="/" component={ App }></Route>
      <App/>
    </HashRouter>
  // </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  // window.getTodos = getTodos;
  // window.store = configureStore;
  // const preloadedState = localStorage.state ?
  //     JSON.parse(localStorage.state) : {};

  const rootElement = document.getElementById('content');
  ReactDOM.render(<Provider store={store}><HashRouter><App/></HashRouter></Provider>, rootElement);
})
