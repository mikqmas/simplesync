export const fetchSubTasks = todoId => {
  console.log(todoId);
  return (
  $.ajax({
    method: 'GET',
    url: `/api/todos/${todoId}/sub_tasks`
  }).done((data)=>{
    console.log("DATA: ", data);
  })
)};

export const createSubTask = subTask => (
 $.ajax({
    method: 'POST',
    url: `/api/todos/${subTask.todo_id}/sub_tasks`,
    data: {subTask}
  })
);

export const updateSubTask = subTask => (
  $.ajax({
    method: 'PUT',
    url: `/api/todos/${subTask.todo_id}/sub_tasks/${subTask.id}`,
    data: {subTask}
  })
)

export const deleteSubTask = subTask => (
  $.ajax({
    method: 'DELETE',
    url: `/api/todos/${subTask.todo_id}/sub_tasks/${subTask.id}`
  })
)
