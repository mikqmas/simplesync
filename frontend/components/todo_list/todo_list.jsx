import React from 'react';
import TodoListForm from './todo_form';
import TodoContent from './todo_content';
import { Link } from 'react-router-dom';
import Todo from './todo';

class TodoList extends React.Component {
  render() {
    const {user, search, todos, createTodo, errors} = this.props;
    const filteredTodo = todos.filter((todo) => {
      return (todo.title.toLowerCase()
        .indexOf(search.toLowerCase()) != -1 ||
        todo.users.filter((user)=>
        (user.username.toLowerCase()
        .indexOf(search.toLowerCase()) != -1 )).length > 0
      );
    });
    const todoItems = () => (
      <ul>
        {
          filteredTodo.map(todo => (
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
