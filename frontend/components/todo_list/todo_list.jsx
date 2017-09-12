import React from 'react';
import TodoListForm from './todo_form';
import TodoContent from './todo_content';
import { Link } from 'react-router-dom';
import Todo from './todo';

class TodoList extends React.Component {
  componentWillMount() {
    this.props.fetchTodos();
  }
  render() {
    const {user, todos, createTodo, errors} = this.props;
    const todoItems = () => (
      <ul>
        {
          todos.map(todo => (
            <Todo key={todo.id} todo={todo}/>
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
