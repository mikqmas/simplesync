import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
// import {updateSubTask, deleteSubTask} from '../../actions/subtask_actions';

class SubTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {body: ""}
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // this.todo = Object.keys(nextProps.todos).length ? nextProps.todos[nextProps.match.params.id] : {};
    debugger
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
    const subtask = Object.assign({}, this.state);
    this.props.createSubTask({subtask});
  }

  render() {
    return(
      <div>
        <input type="text" placeholder="subtask.." value={this.state.body} onChange={this.handleInput}/>
        <input type="button" onClick={this.handleClick} value="add"/>
        <ul>
          <div>test</div>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createSubTask: subTask => dispatch(createSubTask(subTask)),
  updateSubTask: subTask => dispatch(updateSubTask(subTask)),
  fetchSubTasks: () => dispatch(fetchSubTasks()),
  deleteSubTask: subTask => dispatch(deleteTodo(subTask))
});

const mapStateToProps = (state) => ({
  subTasks: state.subTasks
});

export default withRouter(connect(
  mapDispatchToProps,
  mapStateToProps
)(SubTask));
