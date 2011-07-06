class TotalsController < ApplicationController
    
  def total
    @total = Total.order('count').first
    if(@total)
      @total.update_attributes(:count => @total.count + 1)
    else
      new_total = Total.new(:count => 1)
      new_total.save
    end
    total = Total.order('count').first
    render :json => {:result => "success", :total => total.count}
  end
  
end