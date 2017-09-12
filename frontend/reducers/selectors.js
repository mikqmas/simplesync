export const allTodos = ({ todos }) => Object.keys(todos).map(id => todos[id]).reverse();

export const allSubTasks = ({ subTasks }) => Object.keys(subTasks).map(id => subTasks[id]).reverse();
