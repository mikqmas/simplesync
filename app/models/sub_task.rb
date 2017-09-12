class SubTask < ApplicationRecord
  belongs_to :todo

  validates(
    :body,
    :todo_id,
    :list_order,
    presence: true
  )

  validates :done, inclusion: { in: [ true, false ] }

end
