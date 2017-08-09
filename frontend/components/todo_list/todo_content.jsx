import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TodoDetail from './todo_detail'

const TodoContent = () => (
  <content className="list_content">
    <Switch>
      <Route exact path='/' render={()=>(<div>Loading...</div>)}/>
      <Route exact path='/:id' component={TodoDetail} />
    </Switch>
  </content>
)

export default TodoContent;
