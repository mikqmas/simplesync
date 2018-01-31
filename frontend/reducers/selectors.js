export const allTodos = ({ todos }) => {
  return Object.keys(todos).filter((key) => (!isNaN(parseInt(key)))).map(id => todos[id]).reverse();
}

export const allSubTasks = ({ subTasks }) => Object.keys(subTasks).map(id => subTasks[id]).reverse();
