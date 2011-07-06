// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require externals
//= require_tree .

var sto; // setTimeout object

var stage_one = 1000; // 7000
var total_time = 10000; // 600000
var duration = total_time - stage_one;
var begin_dimensions = "843px";
var so_dimensions = "700px";
var end_dimensions = "200px";

$(function(){
	
	/*  Init  */
	
	$.Body 				= $('html, body');
	$.Window 			= $(window);
	$.SunContainer 		= $('.sun-container');
	$.Sun 				= $('.sun');
	$.Warning 			= $('.mousemove-warning');
	$.FactContainer		= $('.fact-container p');
	$.Message 			= $('#message');
	$.Map 				= $("#map_canvas")
	
	
	/*  Order Facts  */
	
	$.fn.OrderFacts = function(){
		
		var $self = $(this);
		var count = 0;
		$self.each(function(index) {
			var space = ($.Window.height() - $(this).height()) / 2;
			$(this).css("padding", space + "px 0 " + space + "px 0" ).Hide(function(){});
			// console.log(space);
			count++;
		});
		
		var new_body_height = $.Window.height() * count;
		$.Body.css("height", new_body_height + "px");
	}
	
	/*  Hide  */
	
	$.fn.Hide = function( fun ){
		
		var $self = $(this);
		$self.each(function(index) {
			$(this).animate( { opacity : 0 }, 0, "linear", fun)
		});
	}
	
	/*  Reveal  */
	
	$.fn.Reveal = function( fun ){
		
		var $self = $(this);
		$self.each(function(index) {
			$(this).animate( { opacity : 1 }, 750, "linear", fun)
		});
	}
	
	/*  Scrolling  */
	
	$.fn.Scrolling = function(){
		
		var $self = $(this) , $id = $self.attr('id');
		
		$.Window.bind('scroll',
			function(e){
				_scroll();
			});
		
		function _scroll(){
			var fold = $.Window.scrollTop();
			var percent = fold / ( $.Body.height() - $.Window.height() );
			// console.log(fold + " " + percent)
			$.SunContainer.animate({ top: (percent * ($.Body.height() - $.Sun.height() - 150)) + "px" }, 50, "linear");
			$.Sun.animate({ height: 200 + (percent * 500) + "px",width: 200 + (percent * 500) + "px" }, 50, "linear");
		}
	}
	
	/*  Application Actions  */
	
	// Space the pieces out based on window size
	$.FactContainer.OrderFacts();
	
	// Scroll to bottom of page
	$.Body.css("overflow","hidden").animate({scrollTop: $(document).height()}, 1, 'linear');
	
	// Hide features onLoad
	$.Sun.hide();
	$.Warning.hide();
	$.Message.animate({opacity: 0}, 1, "linear");
	$.Map.animate({opacity: 0}, 1, "linear");
	
	
	$.Window.resize(function(){ $.Body.css("overflow","hidden").animate({scrollTop: $(document).height()}, 10, 'linear', function(){ $.FactContainer.OrderFacts(); }); })
	

	
	// Initiate begin button functionality
	$('.begin-button').click(function(){
		
		$.Window.unbind('resize');
		
		// Fade out intro copy and begin button
		$(this).fadeTo(1000,0);
		$('.intro-copy').fadeTo(1000,0);
		
		// Bring in the proverbs and facts
		$.FactContainer.Reveal(function(){});
		
		// Send Sun to bottom, Begin animation
		$.Sun.show().css("margin-top","525px");
		$.Sun.animate({ marginTop: '200px',width: so_dimensions, height: so_dimensions }, stage_one, 'linear', function(){
			
			// Begin to climb up the page
			$.Body.animate( {scrollTop: '0px'}, duration, 'linear', function(){
				if($(this).hasClass('body'))
				{
					// Save the donated minute
					$.post("/save", { },
						function(response)
						{						
							if(response.result == "success")
							{
								initialize(response.latitude,response.longitude);
							}
						}, 'json');
			
					$.post("/total", { },
						function(response)
						{
							if(response.result == "success")
							{
								$('.total').empty().append(response.total);
							}
						}, 'json');
						
					$.Window.unbind('mousemove');
					$('html').css("overflow","auto");
					$.SunContainer.css("position","absolute");
					$.FactContainer.Hide();
					showAll();
					
					$.Body.Scrolling();
				}
			});
			$.SunContainer.animate({ top: '0px', bottom: 'auto', height: (end_dimensions + 20)}, duration, 'linear');
			$.Sun.animate({ marginTop: "0px", width: end_dimensions, height: end_dimensions }, duration, 'linear')		

			// Remove former mouseMove function
			$.Window.unbind('mousemove');
			
			// Add pausing when mouse is moved
			$.Window.mousemove( function(){
				if(sto){ window.clearTimeout(sto); }
				$.Body.pause();
				$.SunContainer.pause();
				$.Sun.pause();
				$.Warning.show();
				sto = window.setTimeout(function(){ resume(); }, 1000);
			});
		})
		
		// Add pausing when mouse is moved
		$.Window.mousemove( function(){
			if(sto){ window.clearTimeout(sto); }
			$.Sun.pause();
			$.Warning.show();
			sto = window.setTimeout(function(){ resume(); }, 1000);
		});
		
	});
	
	function resume()
	{
		// Resume animations that have been paused
		$.Body.resume();
		$.SunContainer.resume();
		$.Sun.resume();
		$.Warning.hide()
	}
	
	var showCount = 0;
	var showArray = [$.Message,
					 $.Map]
	function showAll()
	{	
		if(showCount < showArray.length)
		{
			showArray[showCount].Reveal(showAll);
		}
		showCount++;
	}
	
	
	
});



