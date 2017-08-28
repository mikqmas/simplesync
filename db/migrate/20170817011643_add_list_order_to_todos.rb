class AddListOrderToTodos < ActiveRecord::Migration[5.0]
  def change
    add_column :todos, :list_order, :int
  end
end
