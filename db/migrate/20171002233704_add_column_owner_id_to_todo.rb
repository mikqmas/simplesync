class AddColumnOwnerIdToTodo < ActiveRecord::Migration[5.0]
  def change
    add_column :todos, :owner_id, :int, null: false, default: 0
  end
end
