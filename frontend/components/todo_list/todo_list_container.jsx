import {connect} from 'react-redux';
import TodoList from './todo_list';

//actions
import {allTodos} from '../../reducers/selectors';
import {fetchTodos, createTodo, updateTodo, deleteTodo} from '../../actions/todo_actions';
import {fetchSubTasks} from '../../actions/sub_task_actions';

const mapStateToProps = (state) => ({
  user: state.user,
  todos: allTodos(state),
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  createTodo: todo => dispatch(createTodo(todo)),
  updateTodo: todo => dispatch(updateTodo(todo)),
  fetchTodos: () => dispatch(fetchTodos()),
  deleteTodo: todo => dispatch(deleteTodo(todo)),
  fetchSubTasks: todoId => dispatch(fetchSubTasks(todoId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
