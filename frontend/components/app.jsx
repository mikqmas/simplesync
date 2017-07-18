import React from 'react';
import TodoListContainer from './todo_list/todo_list_container';
import Login from './login';
import {Link, Switch, Route} from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
      </ul>
    </nav>
  </header>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>
  </main>
)

const Home = () => (
  <div>
    <Login/>
  </div>
)

const App = () => (
  <div>
    <Header/>
    <Main/>
  </div>
)

module.exports = App;
