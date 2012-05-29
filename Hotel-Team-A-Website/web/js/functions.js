

/* SUPERFISH MENU ====================================== */
$('ul.sf-menu').superfish({ 
            delay:       800,                            // one second delay on mouseout 
            animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
            speed:       'normal',                          // faster animation speed 
            autoArrows:  false,                           // disable generation of arrow mark-up 
            dropShadows: false                            // disable drop shadows 
        }); 

    // HOVER IMAGE MAGNIFY===============================================================================
$(document).ready(function(){
    //Set opacity on each span to 0%
    $(".magnify").css({'opacity':'0'});

	$('.picture a').hover(
		function() {
			$(this).find('.magnify').stop().fadeTo(800, 1);
		},
		function() {
			$(this).find('.magnify').stop().fadeTo(800, 0);
		}
	)
});	
	$('.tooltip_1').poshytip({
				className: 'tip-twitter',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'center',
				offsetY: 5,
				allowTipHover: false,
				fade: true,
				slide: true
			})
/* PRETTY PHOTO ======================================== */
	$("a[data-rel^='prettyPhoto']").prettyPhoto({
		social_tools: '',
		overlay_gallery: false
	});
	



/* WEATHER ======================================== */
$(function(){

    // Specify the ZIP/location code and units (f or c)
    var loc = 'SPXX0015'; // or e.g. SPXX0050
    var u = 'f';

    var query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'";
    var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
    var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

    window['wxCallback'] = function(data) {
        var info = data.query.results.channel.item.condition;
        $('#wxIcon').css({
            backgroundPosition: '-' + (61 * info.code) + 'px 0'
        }).attr({
            title: info.text
        });
        $('#wxIcon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
        $('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));
    };

    $.ajax({
        url: url,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'wxCallback'
    });
    
});


/* MOBILE MENU ======================================== */
$('#main-nav').mobileMenu();
	
/* RATING ======================================== */
        
        // $('.rate_wd').each(function(i) {
        //     var widget = this;
        //     var out_data = {
        //         widget_id : $(widget).attr('id'),
        //         fetch: 1
        //     };
        //     $.post(
        //         'ratings.php',
        //         out_data,
        //         function(INFO) {
        //             $(widget).data( 'fsr', INFO );
        //             set_votes(widget);
        //         },
        //         'json'
        //     );
        // });
    

        // $('.ratings_stars').hover(
        //     // Handles the mouseover
        //     function() {
        //         $(this).prevAll().andSelf().addClass('ratings_over');
        //         $(this).nextAll().removeClass('ratings_vote'); 
        //     },
        //     // Handles the mouseout
        //     function() {
        //         $(this).prevAll().andSelf().removeClass('ratings_over');
        //         // can't use 'this' because it wont contain the updated data
        //         set_votes($(this).parent());
        //     }
        // );
        
        
        // This actually records the vote
        // $('.ratings_stars').bind('click', function() {
        //     var star = this;
        //     var widget = $(this).parent();
            
        //     var clicked_data = {
        //         clicked_on : $(star).attr('class'),
        //         widget_id : $(star).parent().attr('id')
        //     };
        //     $.post(
        //         'ratings.php',
        //         clicked_data,
        //         function(INFO) {
        //             widget.data( 'fsr', INFO );
        //             set_votes(widget);
        //         },
        //         'json'
        //     ); 
        // });
        

    function set_votes(widget) {

        // var avg = $(widget).data('fsr').whole_avg;
        // var votes = $(widget).data('fsr').number_votes;
        // var exact = $(widget).data('fsr').dec_avg;
    
        // window.console && console.log('and now in set_votes, it thinks the fsr is ' + $(widget).data('fsr').number_votes);
        
        // $(widget).find('.star_' + avg).prevAll().andSelf().addClass('ratings_vote');
        // $(widget).find('.star_' + avg).nextAll().removeClass('ratings_vote'); 
        // $(widget).find('.total_votes').text( votes + ' votes (' + exact + ' Rating)' );
    }
// EXPOSE FUNCTIONS
$(function() {

	// expose the form when it's clicked or cursor is focused
	var form = $(".expose").bind("click keydown", function() {

		$(this).expose({

			// when exposing is done, change form's background color
			onLoad: function() {
				form.css({backgroundColor: '#f6f6f6'});
			},

			// when "unexposed", return to original background color
			onClose: function() {
				form.css({backgroundColor: null});
			}

		});
	});
});





