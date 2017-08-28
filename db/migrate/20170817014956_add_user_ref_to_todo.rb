class AddUserRefToTodo < ActiveRecord::Migration[5.0]
  def change
    change_column_default :user_todos, :permission, 0
  end
end
