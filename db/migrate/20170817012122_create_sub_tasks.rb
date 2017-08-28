class CreateSubTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :sub_tasks do |t|
      t.integer :todo_id, null:false
      t.string :body, null:false
      t.boolean :done, null:false
      t.integer :list_order, null:false

      t.timestamps
    end
  end
end
