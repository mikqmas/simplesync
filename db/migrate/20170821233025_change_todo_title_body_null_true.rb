class ChangeTodoTitleBodyNullTrue < ActiveRecord::Migration[5.0]
  def change
    change_column :todos, :title, :string, null: true, default: ""
    change_column :todos, :body, :string, null: true, default: ""
    change_column :todos, :done, :boolean, default: false
  end
end
