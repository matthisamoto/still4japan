function initialize(latitude, longitude, city_name)
{
	var latlng = new google.maps.LatLng(latitude, longitude);
	var style = [{
					featureType: "all",
					elementType: "all",
					stylers: [
						{ visibility: "simplified" },
						{ hue: "#FFA200" },
						{ saturation: -33 },
						{ Lightness: 63 },
						{ Gamma: 0.5 }
					]
					},
				{
					featureType: "road",
					elementType: "all",
					stylers: [{visibility: "off"}]
					},
				{
					featureType: "administrative",
					elementType: "all",
					stylers: [{visibility: "off"}]
					},
				{
					featureType: "landscape.man_made",
					elementType: "all",
					stylers: [{visibility: "off"}]
					},
				{
					featureType: "poi",
					elementType: "all",
					stylers: [{visibility: "off"}]
					}
				]
				
	var myOptions = {
		zoom: 2,
		center: latlng,		
		mapTypeControlOptions: {
		       mapTypeIds: ['japan']
		}
		
	};
	
	var map = new google.maps.Map( document.getElementById("map_canvas"), myOptions );
	
	var styledMapOptions = {name: "Still4Japan"}

	var japanMapType = new google.maps.StyledMapType(style, styledMapOptions);

	map.mapTypes.set('japan', japanMapType);
	map.setMapTypeId('japan');
	
	var infowindow = new google.maps.InfoWindow({ size: new google.maps.Size(100,30) });
	
	//
	// Test Map Items
	var city_list = {};
	
	city_list['you'] = { center: latlng , minutes: 100 , name: city_name }
	city_list['ams'] = { center: new google.maps.LatLng(52.374, 4.889) , 		minutes: 300 , name: "Amsterdam" }
	city_list['lon'] = { center: new google.maps.LatLng(51.5085, -0.1257) , 	minutes: 800 , name: "London" }
	city_list['par'] = { center: new google.maps.LatLng(48.8534, 2.3488) , 		minutes: 600 , name: "Paris" }
	city_list['nyc'] = { center: new google.maps.LatLng(40.7142, -74.0059) , 	minutes: 200 , name: "New York City" }
	city_list['los'] = { center: new google.maps.LatLng(34.0522, -118.2436) , 	minutes: 700 , name: "Los Angeles" }
	city_list['tok'] = { center: new google.maps.LatLng(35.6148, 139.5813) , 	minutes: 500 , name: "Tokyo" }
	// End Test Items 
	//
	
	var city_circle;
	var circle_list = {};
	
	for (var city in city_list)
	{
		var html = "";
		html += "<strong>" + city_list[city].name + "</strong>";
		html += "<p>" + city_list[city].minutes + " Minutes Donated</p>";
		
		
		// Construct the circle for each value in citymap. We scale population by 20.
		var populationOptions = {
			strokeColor: "#CC0000",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#CC0000",
			fillOpacity: 0.35,
			map: map,
			center: city_list[city].center,
			radius: city_list[city].minutes * 1000
		};
		
		cityCircle = new google.maps.Circle(populationOptions);
		cityCircle.set("name",city_list[city].name);
		cityCircle.set("html",html);
		circle_list[ city_list[city].name ] = { circle: cityCircle , html: html };
	}
	
	for(var circle in circle_list)
	{
		// console.log("Circle "+ circle + " : " + circle_list[circle].circle.get("name"));
		google.maps.event.addListener( circle_list[circle].circle, 'click', function(event) {
			console.log(circle_list[circle].circle.get("name"))
			infowindow.setContent(circle_list[circle].circle.get("html"));
			if (event) { point = event.latLng; }
			infowindow.setPosition(point);
			infowindow.open(map);
        });
	}
	
	
	google.maps.event.addListener(map, 'click', function() { infowindow.close(); });
}