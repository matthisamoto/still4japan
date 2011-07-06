class LocationController < ApplicationController
    
  def index
    
  end
    
  def locate
    g = GeoIP.new('/usr/local/share/GeoIP/GeoLiteCity.dat')
    # location = g.country request.remote_ip
    location = g.country '208.45.217.130'
    location.to_a
    return location
  end
  
  def save
    location_obj = locate
    @location = Location.find_by_city_name(location_obj.city_name)
    if(@location)
      update(location_obj)
    else
      create(location_obj)
    end    
  end
  
  def create(location_obj)
    @location = Location.new(:count => 1, :city_name => location_obj.city_name, :region_name => location_obj.region_name, :country_name => location_obj.country_code3, :latitude => location_obj.latitude, :longitude => location_obj.longitude)
    if @location.save
      render :json => { :result => "success", :latitude => location_obj.latitude, :longitude => location_obj.longitude }
    else    
    end    
  end

  def update(location_obj)
    @location = Location.find_by_city_name(location_obj.city_name)
    if @location.update_attributes(:count => @location.count + 1)
      render :json => { :result => "success", :latitude => location_obj.latitude, :longitude => location_obj.longitude }
    else
    end
  end
  
end
