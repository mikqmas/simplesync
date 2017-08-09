import React from 'react';
import TodoListItem from './todo_list_item';
import TodoListForm from './todo_form';
import TodoContent from './todo_content';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   "selectedTodo": 0
    // }
    // this.selectedItem = this.selectedItem.bind(this);
    this.todoContent = this.todoContent.bind(this);
  }

  componentWillMount() {
    this.props.fetchTodos();
  }

  // selectedItem(id) {
  //   this.setState({"selectedTodo": id});
  //   console.log(id);
  // };

  todoContent() {
    const {todos, deleteTodo, updateTodo} = this.props;
    if(this.state.selectedTodo) {
      return (
        <TodoContent
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          todo={todos.find(todo => (todo.id === this.state.selectedTodo))}/>
      )
    } else {
      return "";
    }
  }

  render() {
    const {user, todos, createTodo, errors} = this.props;
    const todoItems = todos.map(todo => (
      <TodoListItem key={todo.id}
        selectedItem={this.selectedItem}
        todo={todo}/>
    ));

    const todoForm = (
      <TodoListForm createTodo={createTodo} errors={errors} user={user} />
    )

    return (
      <div className="main_content">
        <div className="list_todos">
          <ul>
            {todoItems}
          </ul>
        </div>

        <div className="list_content">
          {this.todoContent()}
        </div>
      </div>
    )
  }
}


export default TodoList;
