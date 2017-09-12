import React from 'react';
import TodoListForm from './todo_form';
import TodoContent from './todo_content';
import { Link } from 'react-router-dom';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);

  }
  componentWillMount() {
    this.props.fetchTodos();
  }
  handleDelete(todo) {
    this.props.deleteTodo(todo);
  }
  handleCompleted(todo) {
    const toggledTodo = {
      id: todo.id,
      done: !todo.done
    };
    this.props.updateTodo(toggledTodo);
  }

  render() {
    const {user, todos, createTodo, errors} = this.props;
    const todoItems = () => (
      <ul>
        {
          todos.map(todo => (
            <Link key={todo.id} to={`/${todo.id}`} onClick={()=>{this.props.fetchSubTasks(todo.id)}}>
              <li className="task_items">
                <input type="button" onClick={()=>this.handleCompleted(todo)} value={todo.done ? "done" : "undo"}/>
                <input type="button" value="delete" onClick={()=>{this.handleDelete(todo)}} />
                {todo.title}
              </li>
            </Link>
          ))
        }
      </ul>
    )

    const todoForm = (
      <TodoListForm createTodo={createTodo} errors={errors} user={user} />
    )

    return (
      <div className="list_todos">
        {todoItems()}
      </div>
    )
  }
}
// <TodoListForm createTodo={createTodo} errors={errors} user={user} />

export default TodoList;
