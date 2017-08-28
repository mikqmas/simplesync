class FixColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :todos, :creator_user_id, :owner_id
  end
end
