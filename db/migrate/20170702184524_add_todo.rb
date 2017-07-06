class AddTodo < ActiveRecord::Migration[5.0]
  def change
    create_table :todos do |t|
      t.string :title, null:false
      t.string :body, null:false
      t.boolean :done, null:false

      t.timestamps null:false
    end
    add_index :todos, :title
    add_index :todos, :body
  end
end
