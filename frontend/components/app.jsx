import React from 'react';
import TodoListContainer from './todo_list/todo_list_container';
import Login from './landing/login';
import Signup from './landing/signup';
import Contact from './landing/contact'
import {Link, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/user_actions';

const Header = () => (
  <header className="site-header">
    <h1 className="logo">
      <Link to='/'>SimpleSync</Link>
    </h1>
    <nav>
      <ul className="nav">
        <li><Link to='/contact'>Contact Us</Link></li>
        <li><Link to='/login'>Log In</Link></li>
        <li><Link to='/signup'>Create an Account</Link></li>
      </ul>
    </nav>
  </header>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/contact' component={Contact}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
    </Switch>
  </main>
)

const Home = () => (
  <div>
    <div id="homepage-banner">
      <div className="welcome-text">
        <div className="row1">
          <h1>The Simplest way to keep tasks synced.</h1>
          <p>Light, clean, and free. Simplenote is now available for iOS, Android, Mac, Windows, Linux, and the web.</p>
        </div>
      </div>
    </div>
  </div>
)



class App extends React.Component {
  render() {
    if(this.props.user.current_user) {
      return(<div>Tasks!!!<button onClick={this.props.logout}>Logout</button></div>)
    }else {
      return(
        <div>
          <Header/>
          <Main/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
})

const mapDispatchToProps = dispatch =>  ({
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);



// export default App;
