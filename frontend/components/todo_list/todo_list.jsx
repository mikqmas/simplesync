import React from 'react';
import TodoListForm from './todo_form';
import TodoContent from './todo_content';
import { Link } from 'react-router-dom';

class TodoList extends React.Component {
  componentWillMount() {
    this.props.fetchTodos();


    //export TODOAPI to use in todo_detail page.
    const TodoAPI = {
      all: () => { return this.props.todos },
      get: (id) => {
        const isTodo = t => t.id === id
        return this.todos.find(isTodo)
      }
    }
  }


  render() {
    const {user, todos, createTodo, errors} = this.props;
    const todoItems = () => (
      <div className="list_todos">
        <ul>
          {
            todos.map(todo => (
              <li key={todo.id} className="task_items">
                <Link to={`/${todo.id}`}>
                  {todo.title}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )

    const todoForm = (
      <TodoListForm createTodo={createTodo} errors={errors} user={user} />
    )

    return (
      <div className="main_content">
        {todoItems()}
      </div>
    )
  }
}


export default TodoList;
