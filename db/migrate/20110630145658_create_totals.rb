class CreateTotals < ActiveRecord::Migration
  def change
    create_table :totals do |t|
      t.integer :count
      t.timestamps
    end
  end
end
