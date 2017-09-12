import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import {fetchSubTasks, createSubTask, updateSubTask, deleteSubTask} from '../../actions/sub_task_actions';
import {allSubTasks} from '../../reducers/selectors';

class SubTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {body: "", done: false, list_order: 0, todo_id: this.props.match.params.id}
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    this.setState({todo_id: nextProps.match.params.id})
    // this.todo = Object.keys(nextProps.todos).length ? nextProps.todos[nextProps.match.params.id] : {};
    // this.subTasks = Object.keys(nextProps.subTasks).length ? nextProps.subTasks[nextProps.match.params.id] : {};
    // this.setState({
    //   "title": this.todo.title,
    //   "body": this.todo.body,
    //   "done": this.todo.done
    // });
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({
      body: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    const subTask = Object.assign({}, this.state);
    this.props.createSubTask(subTask);
  }

  render() {
    const subTaskItems = () => (
      <ul>
        {
          this.props.subTasks.map(subTask => (
            <Link key={subTask.id} to={`${subTask.todo_id}/sub_tasks/${subTask.id}`}>
              <li className="task_items">
                // <input type="button" onClick={()=>this.handleCompleted(subTask)} value={subTask.done ? "done" : "undo"}/>
                // <input type="button" value="delete" onClick={()=>{this.handleDelete(subTask)}} />
                {subTask.body}
              </li>
            </Link>
          ))
        }
      </ul>
    )

    return(
      <div>
        <input type="text" placeholder="subtask.." value={this.state.body} onChange={this.handleInput}/>
        <input type="button" onClick={this.handleClick} value="add"/>
        <ul>
          <div>{subTaskItems()}</div>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSubTasks: todoId => dispatch(fetchSubTasks(todoId)),
  createSubTask: subTask => dispatch(createSubTask(subTask)),
  updateSubTask: subTask => dispatch(updateSubTask(subTask)),
  deleteSubTask: subTask => dispatch(deleteTodo(subTask))
});

const mapStateToProps = (state) => ({
  subTasks: allSubTasks(state)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SubTask));
