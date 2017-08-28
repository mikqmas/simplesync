class DeleteColumnTodoTableOwnerId < ActiveRecord::Migration[5.0]
  def change
    remove_column :todos, :owner_id
  end
end
