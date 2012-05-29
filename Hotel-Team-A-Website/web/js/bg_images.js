	jQuery(function($){
				
				$.supersized({
				
					//Functionality
					slideshow               :   1,		//Slideshow on/off
					autoplay				:	1,		//Slideshow starts playing automatically
					start_slide             :   1,		//Start slide (0 is random)
					random					: 	0,		//Randomize slide order (Ignores start slide)
					slide_interval          :   6000,	//Length between transitions
					transition              :   1, 		//0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
					transition_speed		:	800,	//Speed of transition
					new_window				:	1,		//Image links open in new window/tab
					pause_hover             :   0,		//Pause slideshow on hover
					keyboard_nav            :   1,		//Keyboard navigation on/off
					performance				:	1,		//0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
					image_protect			:	1,		//Disables image dragging and right click with Javascript
					image_path				:	'img/', //Default image path

					//Size & Position
					min_width		        :   0,		//Min width allowed (in pixels)
					min_height		        :   300,		//Min height allowed (in pixels)
					vertical_center         :   0,		//Vertically center background
					horizontal_center       :   1,		//Horizontally center background
					fit_portrait         	:   0,		//Portrait images will not exceed browser height
					fit_landscape			:   0,		//Landscape images will not exceed browser width
					
					//Components
					navigation              :   1,		//Slideshow controls on/off
					thumbnail_navigation    :   0,		//Thumbnail navigation
					slide_counter           :   1,		//Display slide numbers
					slide_captions          :   1,		//Slide caption (Pull from "title" in slides array)
					slides 					:  	[			// Slideshow Images
														{image : 'img/1.jpg', title : 'Amazing<span>Lorem ipsum dolor sit amet, lacus <a href="#"> sollicitudin nullam</a>.</span>'},
														{image : 'img/2.jpg', title : 'Relax<span>Lorem ipsum dolor sit amet, lacus <a href="#"> sollicitudin nullam</a>.</span>'},
														{image : 'img/3.jpg', title : 'Unforgettable<span>Lorem ipsum dolor sit amet, lacus <a href="#"> sollicitudin nullam</a>.</span>'},
														{image : 'img/4.jpg', title : 'Nice view<span>Lorem ipsum dolor sit amet, lacus <a href="#"> sollicitudin nullam</a>.</span>'},
														{image : 'img/7.jpg', title : 'Amazing places<span>Lorem ipsum dolor sit amet, lacus dictum urna sollicitudin nullam ac.</span>'},
														{image : 'img/8.jpg', title : 'Caption<span>Lorem ipsum dolor sit amet, lacus dictum urna sollicitudin nullam ac.</span>'}
												]
					
				});
		    });