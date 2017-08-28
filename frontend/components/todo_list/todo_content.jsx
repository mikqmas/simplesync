import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TodoDetail from './todo_detail'

const TodoContent = () => (
  <content className="list_content">
    <Switch>
      <Route exact path='/' render={()=><div>this is a test!!!!</div>} />
      <Route path='/:id' component={TodoDetail}/>
    </Switch>
  </content>
)

export default TodoContent;
