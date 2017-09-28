class UserTodo < ApplicationRecord
  belongs_to :user
  belongs_to :todo

  validates(
    :user_id,
    :todo_id,
    :permission,
    presence: true
  )

  def is_owner?
    debugger
    # UserTodo.find_by()
  end

end
