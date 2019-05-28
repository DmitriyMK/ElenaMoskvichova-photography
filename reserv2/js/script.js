$(document).ready(function() {

	if (document.documentElement.clientWidth > 1200) {

		$("body").niceScroll({
			scrollspeed: 70,
			mousescrollstep: 60,
			smoothscroll: true,
			cursorwidth: 8,
			cursorborder: 0,
			cursorcolor: '#FF5252',
			cursorborderradius: 2,
			autohidemode: true,
			horizrailenabled: false,
			cursoropacitymin: 1,
			background: false,
			zindex: "9999"
		});

		$('html').addClass('no-overflow-y');
	};

});



/*CAROUSEL*/
var $item = $('.carousel .item');
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight);
$item.addClass('full-screen');

$('.carousel img').each(function() {
	var $src = $(this).attr('src');
	$(this).parent().css({
		'background-image': 'url(' + $src + ')'
	});
	$(this).remove();
});


$(window).on('resize', function() {
	$wHeight = $(window).height();
	$item.height($wHeight);
});


$('.carousel').carousel({
	interval: 100000,
	pause: "false"
});



/*MENU*/
$('#toggle').click(function() {
	$(this).toggleClass('active');
	$('#overlay').toggleClass('open');
});


var $menu = $('#toggle');

$(document).mouseup(function(e) {
	if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {

		$("#toggle").removeClass('active');
		$('.overlay').removeClass('open');

	}
});


/*FILTER*/
$(function() {

	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		percentPosition: true,
		columnWidth: '.grid-sizer',
	});

	var selectedClass = "";
	$(".fil-cat").click(function() {
		selectedClass = $(this).attr("data-rel");
		$("#grid").fadeTo(100, 0.1);
		$("#grid .grid-item").not("." + selectedClass).fadeOut().hide();
		$('.grid').masonry();

		setTimeout(function() {
			$("." + selectedClass).fadeIn();
			$('.grid').masonry();
			$("#grid").fadeTo(100, 1);
		}, 300);

	});
});


$(document).ready(function() {

	$('.phone-mask').mask('+38(999)999-99-99');

	$('.review__slider').slick({

		dots: true,
		arrow: true,
		slidesToShow: 2,
		slidesToScroll: 1,

		infinite: true,


			responsive: [

				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 1,
					}
				},

				{
					breakpoint: 768,
					settings: {
						arrow: false,
						slidesToShow: 1,
					}
				},


				]

	});


	$('[data-fancybox]').fancybox({
		loop: true,
		animationEffect: "zoom",
		transitionEffect: "tube",
		transitionDuration: 366,

		clickOutside: "close",
		protect: true,

		/*		clickSlide: "close",*/
		modal: false,

		touch: {
			vertical: true, // Allow to drag content vertically
			momentum: true // Continue movement after releasing mouse/touch when panning
		},

		thumbs: {
			autoStart: true, // Display thumbnails on opening
			/*	hideOnClose: true, // Hide thumbnail grid when closing animation starts*/
			/*        parentEl: ".fancybox-container", // Container is injected into this element*/
			axis: "y" // Vertical (y) or horizontal (x) scrolling
		},

	});


});



$(window).on('resize orientationchange', function() {
	$('.slider').slick('resize');
});



/*PRELOADER*/
$(window).load(function() {
	$('#preloader').delay(100).fadeOut('slow');

	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		percentPosition: true,
		columnWidth: '.grid-sizer',
	});
});


/*ACCORDION*/
$(function() {

	$('.accordion__header').click(function(e) {

		e.preventDefault();

		$(this).siblings('.accordion-body').slideToggle()
			.parent().toggleClass('active')
			.siblings().removeClass('active')
			.children('.accordion-body').slideUp();
	});


});



//E-mail Ajax Send

$(".form").submit(function() {
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function() {

		var inst = $('[data-remodal-id=modal-thanks]').remodal();
		inst.open();

		setTimeout(function() {
			th.trigger("reset");
		}, 1000);
	});
	return false;
});


$(".contactForm").submit(function() {
	var th = $(this);

	$.ajax({
		type: "POST",
		url: "mail2.php",
		data: th.serialize()
	}).done(function() {

		$(th).find('.success').addClass('active').css("display", "flex").hide().fadeIn();
		setTimeout(function() {
			$(th).find('.success').removeClass('active').fadeOut();
			th.trigger("reset");
		}, 5000);
	});

	return false;
});