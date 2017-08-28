class ChangeUserTodosDataType < ActiveRecord::Migration[5.0]
  def change
    add_column :todos, :archived_time, :datetime;
    add_column :todos, :deleted_time, :datetime;
    add_column :sub_tasks, :archived_time, :datetime;
    add_column :sub_tasks, :deleted_time, :datetime;
  end
end
