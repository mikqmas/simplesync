class AddColumnToUserTodo < ActiveRecord::Migration[5.0]
  def change
    add_column :user_todos, :is_owner, :boolean, default: false
  end
end
