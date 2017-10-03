import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {updateSubTask, deleteSubTask} from '../../actions/sub_task_actions';

class SubTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    const {id, body, done, list_order, todo_id} = this.props.subTask;
    this.state = {id: id, body: body, done: done, list_order: list_order, todo_id: todo_id}
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({todo_id: nextProps.match.params.id})
    // this.todo = Object.keys(nextProps.todos).length ? nextProps.todos[nextProps.match.params.id] : {};
    // this.subTasks = Object.keys(nextProps.subTasks).length ? nextProps.subTasks[nextProps.match.params.id] : {};
    // this.setState({
    //   "title": this.todo.title,
    //   "body": this.todo.body,
    //   "done": this.todo.done
    // });
  }

  handleCompleted(e) {
    e.preventDefault();
    this.setState({done: !this.state.done}, ()=>{this.props.updateSubTask(this.state)});
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteSubTask(this.state);
  }

  handleUpdate(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value}, () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout((() => {
        this.props.updateSubTask(this.state);
      }), 500);
    });
  }

  render() {
    return(
      <li className="task_items">
        <i className="material-icons" onClick={this.handleCompleted}>{this.state.done ? "check_circle" : "done"}</i>
        <i className="material-icons" onClick={this.handleDelete}>delete</i>
        <input type="text" value={this.state.body} name="body" onChange={this.handleUpdate}/>
      </li>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateSubTask: subTask => dispatch(updateSubTask(subTask)),
  deleteSubTask: subTask => dispatch(deleteSubTask(subTask))
});

const mapStateToProps = null;

export default connect(
  null,
  mapDispatchToProps
)(SubTask);
