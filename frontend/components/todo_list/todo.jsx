import React from 'react';
import {connect} from 'react-redux';
import {withRouter, history} from 'react-router';
import { Link } from 'react-router-dom';
import {updateTodo, deleteTodo} from '../../actions/todo_actions';
import {fetchSubTasks} from '../../actions/sub_task_actions';

class Todo extends React.Component {
  constructor(props){
    super(props);
    const {id, title, body, done, list_order} = this.props.todo;
    this.state = {
      id: id,
      title: title,
      body: body,
      done: done,
      list_order: list_order
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleDragStart = this.handleDragStart.bind(this);
    // this.handleDragEnter = this.handleDragEnter.bind(this);
    // this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.user.current_user;
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteTodo(this.state);
    const todosArray = Object.keys(this.props.todos);
    if(todosArray.length === 1) {
      this.props.history.push(`/`);
    }else if(this.props.location.pathname.split("/")[1] == this.state.id) {
      let nextTodo = todosArray.indexOf(this.state.id.toString()) - 1;
      if(nextTodo < 0) {
        nextTodo = 1;
      }
      this.props.history.push(`/${todosArray[nextTodo]}`);
    }
  }
  handleCompleted(e) {
    e.preventDefault();
    this.setState({
      done: !this.state.done
    });
    this.props.updateTodo(this.state);
  }
  handleUpdate(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    }, () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(()=> {
        this.props.updateTodo(this.state);
      }, 500);
    });
  }
  handleClick(e) {
    this.props.fetchSubTasks(this.state.id);
  }

  // handleDragStart(e) {
  //   e.dataTransfer.setData("text/plain", e.target.id);
  //   e.dataTransfer.dropEffect = "move";
  // }
  //
  // handleDrop(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let el = e.target;
  //   let i = 0;
  //   while(!el.getAttribute("draggable") && i < 4) {
  //     el = el.parentElement;
  //     i++;
  //   }
  //   var data = e.dataTransfer.getData("text");
  //   el.insertAdjacentElement("afterend", document.getElementById(data));
  // }
  //
  // handleDragOver(e) {
  //   e.preventDefault();
  //   e.dataTransfer.dropEffect = "move";
  // }
  //
  // handleDragEnter(e) {
  //   e.preventDefault();
  //   // e.dataTransfer.dropEffect = "move";
  //   // let el = e.target;
  //   // let i = 0;
  //   // while(!el.getAttribute("draggable") && i < 4) {
  //   //   el = el.parentElement;
  //   //   i++;
  //   // }
  //   // if(el.getAttribute("draggable") && el.nextSibling.id != "holder") {
  //   //   const el2 = document.createElement("div");
  //   //   el2.textContent = "hello world";
  //   //   el2.id = "holder";
  //   //   el.insertAdjacentElement("afterend", el2);
  //   // }
  // }
  //
  // handleDragLeave(e) {
  //   e.preventDefault();
  //   // e.dataTransfer.dropEffect = "move";
  //   // if(e.target.getAttribute("draggable")) {
  //   //   console.log(e.target);
  //   // }
  //   // if(!e.target.class == "task_items") {
  //   //   return false;
  //   // }
  //   // let el = e.target;
  //   // let i = 0;
  //   // while(!el.getAttribute("draggable") && i < 4) {
  //   //   el = el.parentElement;
  //   //   i++;
  //   // }
  //   // if(el.getAttribute("draggable") && el.nextSibling.id == "holder") {
  //   //   el.nextSibling.remove();
  //   // }
  // }

  render() {
    let bgColor, fontColor;
    if(this.props.location.pathname.split("/")[1] == this.state.id) {
      bgColor = "#00B1E1";
      fontColor = "#FFFFFF";
    }
    // const updatedDate = new Date(this.props.todo.updated_at); //Time updated
    // <span className="created_time">{"Last Update: " + updatedDate.getMonth() + "-" + updatedDate.getDate() + "-" + updatedDate.getFullYear() + " " + updatedDate.getHours() + ":" + updatedDate.getMinutes()}</span>
    return(
      // <div id={this.state.id} draggable="true" onDragStart={this.handleDragStart} onDrop={this.handleDrop} onDragOver={this.handleDragOver} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave}>
      <div id={this.state.id}>
        <Link className="nodrop" to={`/${this.state.id}`} onClick={this.handleClick}>
          <li className="task_items nodrop" style={{backgroundColor:bgColor, color:fontColor}}>
            <span className="delete-done-icon nodrop">
            {
              this.props.todo.owner_id == this.props.user.current_user.id ? <i className="material-icons" onClick={this.handleDelete}>delete</i> : null
            }
            <i className="material-icons nodrop" onClick={this.handleCompleted}>{this.state.done ? "check_circle" : "done"}</i>
            </span>
            <span className="delete-done-icon nodrop">
            <input type="text" className="nodrop" value={this.state.title} onChange={this.handleUpdate} disabled={this.state.done} style={this.state.done ? {textDecoration: "line-through"} : {}}/>
            </span>
          </li>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  todos: state.todos,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  updateTodo: todo => dispatch(updateTodo(todo)),
  deleteTodo: todo => dispatch(deleteTodo(todo)),
  fetchSubTasks: todoId => dispatch(fetchSubTasks(todoId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo));
