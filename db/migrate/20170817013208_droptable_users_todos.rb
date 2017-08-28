class DroptableUsersTodos < ActiveRecord::Migration[5.0]
  def change
    drop_table :table_users_todos
  end
end
