$(document).ready(function(){

    "use strict";

    // Page loader
    $('#loader').delay(350).fadeOut(function(){
		$('body').delay(350).css('overflow-y', 'visible');
	});

	// Onepage navigation
	$('a[href^="#"]').on('click', function(event) {

		var target = $(this.getAttribute('href'));

		if( target.length ) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 100
			});
		}

	});

	// Mobile menu transitions
	$('.hamburger-menu').click(function(event){
		event.preventDefault();
		// Show mobile menu
        $('.overlay-menu').addClass('opened');
    });
	$('.overlay-menu .close-menu, .mobile-header .mobile-menu a').click(function(event){
		// Hide mobile menu
        $('.overlay-menu').removeClass('opened');
    });

	// Show submenu on mobile view
	$('.mobile-menu li.has-child > .submenu-trigger').click(function() {
		$(this).siblings('ul.submenu').slideToggle();
    });

	// Search button and form transitions
	$('.search > .trigger').click(function(event){
		// Show search overlay
        $('.search > .overlay').addClass('triggered');
    });
	$('.search > .overlay > .close-search').click(function(event){
		// Hide search overlay
        $('.search > .overlay').removeClass('triggered');
    });

    // Animate hero section texts
    $('.hero .welcome').css('opacity', '1');
    $('.hero h1').css({
        'opacity': '1',
        'bottom': '0'
    });

	// Setting adaptive height for service boxes
	var serviceWidth = $('.service-box').width();
	$('.service-box').css('height',serviceWidth);
	

    // Filter projects
    if ($('.project-container')[0]){
		$('.project-container').filterizr({
			layout: 'sameWidth'
		});
	}
	$('.project-filters a').on('click', function() {
		$('.project-filters a').removeClass('active');
		$(this).addClass('active');
	});

    // Form label transitions
	$('#contact form input, #contact form textarea, #comment-form form input, #comment-form form textarea').focusin(function(){
		var entry = $(this).val();
		var elementID = $(this).attr('id');
		$('#' + elementID + '+ label').css({
			'left':'100px',
			'opacity':'0',
			'transition':'.2s ease-in-out'
		});
	});
	$('#contact form input, #contact form textarea, #comment-form form input, #comment-form form textarea').focusout(function(){
		var entry = $(this).val();
		var elementID = $(this).attr('id');
		if(entry!=''){
			$('#' + elementID + '+ label').css({
				'left':'100px',
				'opacity':'0',
				'transition':'.2s ease-in-out'
			});
		}else{
			$('#' + elementID + '+ label').css({
				'left':'1rem',
				'opacity':'1',
				'transition':'.2s ease-in-out'
			});
		}
	});

    // Check if any particular element is in viewport
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportBottom && elementTop < viewportBottom;
    };

    // Multiple events
	$(window).scroll(function() {

        // Show/Hide back to top button
		var verticalScroll = $(window).scrollTop();
		if (verticalScroll > 200) {
            $('.site-header').addClass('has-bg');
			$('#top').css('opacity','1');
		} else {
            $('.site-header').removeClass('has-bg');
			$('#top').css('opacity','0');
		}

        // Color change for back to top button
		if($('body').hasClass('homepage')) {
			if ($('#services').isInViewport() || $('#contact').isInViewport()) {
				$("#top").addClass("lightened");
			} else {
				$("#top").removeClass("lightened");
			}
		}

        // Animate stat counters
        $('.stat-counters > .stat > .counter > span').each((i, el) => {
            var $counter = $(el);
            if (!$counter.isInViewport() || $counter.data('animation-started'))
            return;

            $counter.data('animation-started', true).prop('Counter', 0).animate({
                Counter: $counter.text()
            }, {
                duration: 5000,
                easing: 'swing',
                step: function(now) {
                    $counter.text(Math.ceil(now));
                }
            });
        });
	});
    
    // Back to top event
	$('#top').click(function () {
		$('html, body').animate({scrollTop: 0});
	});

});