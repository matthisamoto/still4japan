class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.text "latitude", :default => "", :null => false
      t.text "longitude", :default => "", :null => false
      t.text "city_name", :default => "", :null => false
      t.text "country_name", :default => "", :null => false
      t.text "region_name", :default => "", :null => false
      t.integer "count", :default => 1, :null => false
      t.timestamps
    end
  end
end
