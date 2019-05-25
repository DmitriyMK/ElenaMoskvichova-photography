$(document).ready(function () {

	if (document.documentElement.clientWidth > 1025) {

		$("body").niceScroll({
			scrollspeed: 80,
			mousescrollstep: 30,
			smoothscroll: true,
			cursorwidth: 6,
			cursorborder: 0,
			cursorcolor: '#FF5252',
			cursoropacitymin: 1,
			zindex: "9999"
		});

		$('html').addClass('no-overflow-y');
	};

	if (document.documentElement.clientWidth > 768) {

		var cardWrap = document.getElementsByClassName('grid-item');
		document.body.addEventListener('mousemove', cursorPositionHandler);

		function cursorPositionHandler(e) {
			var decimalX = e.clientX / window.innerWidth - 0.5;
			var decimalY = e.clientY / window.innerHeight - 0.5;

			TweenMax.to(cardWrap, 0.5, {
				rotationY: 20 * decimalX,
				rotationX: -20 * decimalY,
				ease: Quad.easeOut,
				transformPerspective: 700,
				transformOrigin: "center"
			});
		}

	};
});



$('.slideshow .pages .page').on('click', function () {
	TweenMax.to($('.page.is-active i.is-animating'), 1, { x: '101%' });
	slideshowSwitch($(this).closest('.slideshow'), $(this).index(), true);
	loaderAnim = true;
});


$(document).ready(function () {

	var els = document.querySelectorAll(".js-splitme");
	[].forEach.call(els, function (el) {
		el.outerHTML = Splitter(el.outerHTML, '<span class="letter">$</span>');
	});

	objectFitImages();


	$('.carousel').each(function () {
		const $this = $(this);

		$this.slick({

			dots: false,
			arrow: true,
			swipeToSlide: true,
			cssEase: 'linear',
			autoplay: true,
			autoplaySpeed: 3000,
			infinite: true
		});

		$(this).find('.start-slide').removeClass('start-slide');

	});


	$('.review__slider').slick({

		dots: true,
		arrow: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		cssEase: 'linear',

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
			}
		]
	});


	$('[data-fancybox]').fancybox({
		loop: true,
		animationEffect: "zoom",
		transitionEffect: "tube",
		transitionDuration: 366,

		clickOutside: "close",
		protect: true,

		/*clickSlide: "close",*/
		modal: false,

		touch: {
			vertical: true,
			momentum: true
		},

		thumbs: {
			autoStart: true,
			axis: "y"
		},

	});


	$('.phone-mask').mask('+38(999)999-99-99');
});



$(window).on('resize orientationchange', function () {
	$('.slider').slick('resize');
});


/*MENU*/
$('#toggle').click(function () {
	$(this).toggleClass('active');
	$('#overlay').toggleClass('open');
	$('.main__wrap').toggleClass('none-events');
});


var $menu = $('#toggle');

$(document).mouseup(function (e) {
	if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {

		$("#toggle").removeClass('active');
		$('.overlay').removeClass('open');
		$('.main__wrap').removeClass('none-events');

	}
});


/*FILTER*/
$(function () {

	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		percentPosition: true,
		columnWidth: '.grid-sizer',
	});

	var selectedClass = "";

	$(".fil-cat").click(function () {
		selectedClass = $(this).attr("data-rel");
		$("#grid").fadeTo(100, 0.1);
		$("#grid .grid-item").not("." + selectedClass).fadeOut().hide();
		$('.grid').masonry();

		setTimeout(function () {
			$("." + selectedClass).fadeIn();
			$('.grid').masonry();
			$("#grid").fadeTo(100, 1);
		}, 300);

	});
});



/*PRELOADER*/
$(window).load(function () {
	$('#preloader').delay(100).fadeOut('slow');

	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		percentPosition: true,
		columnWidth: '.grid-sizer',
	});
});


/*ACCORDION*/
$(function () {

	$('.accordion__header').click(function (e) {

		e.preventDefault();

		$(this).siblings('.accordion-body').slideToggle()
			.parent().toggleClass('active')
			.siblings().removeClass('active')
			.children('.accordion-body').slideUp();
	});


});



//E-mail Ajax Send

$(".form").submit(function () {
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function () {

		var inst = $('[data-remodal-id=modal-thanks]').remodal();
		inst.open();

		setTimeout(function () {
			th.trigger("reset");
		}, 1000);
	});
	return false;
});


$(".contactForm").submit(function () {
	var th = $(this);

	$.ajax({
		type: "POST",
		url: "mail2.php",
		data: th.serialize()
	}).done(function () {

		$(th).find('.success').addClass('active').css("display", "flex").hide().fadeIn();
		setTimeout(function () {
			$(th).find('.success').removeClass('active').fadeOut();
			th.trigger("reset");
		}, 5000);
	});

	return false;
});