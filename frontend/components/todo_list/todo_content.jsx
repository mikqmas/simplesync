import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TodoDetail from './todo_detail'
import EmptyTodo from './empty_todo'

const TodoContent = () => (
  <content className="content_detail">
    <Switch>
      <Route exact path='/' component={EmptyTodo}/>
      <Route path='/:id' component={TodoDetail}/>
    </Switch>
  </content>
)

export default TodoContent;
