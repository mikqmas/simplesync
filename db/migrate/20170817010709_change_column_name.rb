class ChangeColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :todos, :user_id, :creator_user_id
  end
end
