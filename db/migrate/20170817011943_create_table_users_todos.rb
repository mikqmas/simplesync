class CreateTableUsersTodos < ActiveRecord::Migration[5.0]
  def change
    create_table :table_users_todos do |t|
      t.integer :user_id, null:false
      t.integer :todo_id, null:false
      t.integer :permission, null:false
    end
  end
end
