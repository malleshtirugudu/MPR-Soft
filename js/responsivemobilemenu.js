/*

Responsive Mobile Menu v1.0
Plugin URI: responsivemobilemenu.com

Author: Sergio Vitov
Author URI: http://xmacros.com

License: CC BY 3.0 http://creativecommons.org/licenses/by/3.0/

*/

function responsiveMobileMenu() {	
		$('.m-menu').each(function() {	
            
			$(this).children('ul').addClass('m-menu-main-list');	// mark main menu list
            
			var $style = $(this).attr('data-menu-style');	// get menu style
				if ( typeof $style == 'undefined' ||  $style == false )
					{
						$(this).addClass('graphite'); // set graphite style if style is not defined
					}
				else {
						$(this).addClass($style);
					}
					
					
			/* 	width of menu list (non-toggled) */
			
			var $width = 0;
				$(this).find('ul li').each(function() {
					$width += $(this).outerWidth();
				});
				
			// if modern browser
			
			if ($.support.leadingWhitespace) {
				$(this).css('max-width' , $width*1.05+'px');
			}
			// 
			else {
				$(this).css('width' , $width*1.05+'px');
			}
		
	 	});
}
function getMobileMenu() {

	/* 	build toggled dropdown menu list */
	
	$('.m-menu').each(function() {	
				var menutitle = $(this).attr("data-menu-title");
				if ( menutitle == "" ) {
					menutitle = "Menu";
				}
				else if ( menutitle == undefined ) {
					menutitle = "Menu";
				}
				var $menulist = $(this).children('.m-menu-main-list').html();
				var $menucontrols ="<div class='m-menu-toggled-controls'><div class='m-menu-toggled-title'>" + menutitle + "</div><div class='m-menu-button'><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div></div>";
				$(this).prepend("<div class='m-menu-toggled rmm-closed'>"+$menucontrols+"<ul>"+$menulist+"</ul></div>");

		});
}

function adaptMenu() {
	
	/* 	toggle menu on resize */
	
	$('.m-menu').each(function() {
			var $width = $(this).css('max-width');
			$width = $width.replace('px', ''); 
			if ( $(this).parent().width() < $width*1.05 ) {
				$(this).children('.m-menu-main-list').hide(0);
				$(this).children('.m-menu-toggled').show(0);
				$(this).addClass('m-menu-open');
				$('.m-menu ul ul').removeClass('menu-hover');
			}
			else {
				$(this).children('.m-menu-main-list').show(0);
				$(this).children('.m-menu-toggled').hide(0);
				$(this).removeClass('m-menu-open');
				$('.m-menu ul ul').addClass('menu-hover');
			}
		});
		
}

$(function() {

	 responsiveMobileMenu();
	 getMobileMenu();
	 adaptMenu();
	 
	 /* slide down mobile menu on click */
	 
	 $('.m-menu-toggled, .m-menu-toggled .m-menu-button').click(function(){
	 	if ( $(this).is(".m-menu-closed")) {
		 	 $(this).find('ul').stop().show(300);
		 	 $(this).removeClass("m-menu-closed");
	 	}
	 	else {
		 	$(this).find('ul').stop().hide(300);
		 	 $(this).addClass("m-menu-closed");
	 	}
		
	});	

});
	/* 	hide mobile menu on resize */
$(window).resize(function() {
 	adaptMenu();
});