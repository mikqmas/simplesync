import {connect} from 'react-redux';
import TodoList from './todo_list';

//actions
import {allTodos} from '../../reducers/selectors';
import {fetchTodos, createTodo, updateTodo, deleteTodo} from '../../actions/todo_actions';

const mapStateToProps = (state) => ({
  todos: allTodos(state),
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  createTodo: todo => dispatch(createTodo(todo)),
  updateTodo: todo => dispatch(updateTodo(todo)),
  fetchTodos: () => dispatch(fetchTodos()),
  deleteTodo: todo => dispatch(deleteTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
