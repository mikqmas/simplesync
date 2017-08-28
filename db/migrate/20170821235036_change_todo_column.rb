class ChangeTodoColumn < ActiveRecord::Migration[5.0]
  def change
    change_column :todos, :owner_id, :integer, null: false
    change_column :todos, :list_order, :integer, null: false, default: 0
  end
end
