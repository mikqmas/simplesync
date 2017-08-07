import React from 'react';
import TodoListItem from './todo_list_item';
import TodoListForm from './todo_form';

class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const {user, todos, createTodo, deleteTodo, updateTodo, errors} = this.props;
    const todoItems = todos.map(todo => (
      <TodoListItem key={todo.id}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        todo={todo}/>
    ));

    const todoForm = (
      <TodoListForm createTodo={createTodo} errors={errors} user={user} />
    )

    var style = {
      listStyleType: "none"
    }

    return (
      <div>
        <ul style={style}>
          {todoItems}
        </ul>

        {todoForm}

      </div>
    )
  }
}

export default TodoList;
