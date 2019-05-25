$(document).ready(function () {

	if (document.documentElement.clientWidth > 1025) {

		$("body").niceScroll({
			scrollspeed: 60,
			mousescrollstep: 70,
			smoothscroll: true,
			cursorwidth: 6,
			cursorborder: 0,
			cursorcolor: '#FF5252',
			cursoropacitymin: 1,
			autohidemode: true,
			horizrailenabled: false,
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
				rotationY: 10 * decimalX,
				rotationX: -10 * decimalY,
				ease: Quad.easeOut,
				transformPerspective: 1200,
				transformOrigin: "center"
			});
		}

	};


	var els = document.querySelectorAll(".js-splitme");
	[].forEach.call(els, function (el) {
		el.outerHTML = Splitter(el.outerHTML, '<span class="letter">$</span>');
	});
});



$(document).ready(function () {

	objectFitImages();


	$('.carousel').each(function () {
		const $this = $(this);

		$(this).slick({

			dots: false,
			arrow: true,
			swipeToSlide: true,
			cssEase: 'ease-in',
			lazyLoad: 'progressive',
			// autoplay: true,
			// autoplaySpeed: 3000,
			// pauseOnHover: true,
			infinite: true
		});

		$(this).find('.start-slide').removeClass('start-slide');


		// Ticking progressia
		var percentTime;
		var tick;
		var time = .1;
		var progressBarIndex = 0;


		$('.progress .progress__bar').each(function (index) {
			var progress = "<div class='inProgress inProgress" + index + "'></div>";
			$(this).html(progress);
		});

		function startProgressbar() {
			resetProgressbar();
			percentTime = 0;
			tick = setInterval(interval);
		}

		function interval() {
			if
				(($('.carousel .slick-track li[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
				progressBarIndex = $('.carousel .slick-track li[aria-hidden="false"]').data("slickIndex");
				startProgressbar();
			}
			else {
				percentTime += 1 / (time + 15);
				$('.inProgress' + progressBarIndex).css({
					width: percentTime + "%"
				});
				if (percentTime >= 100) {
					$('.carousel').slick('slickNext');
					progressBarIndex++;
					if (progressBarIndex > 4) {
						progressBarIndex = 0;
					}
					startProgressbar();
				}
			}
		}


		function resetProgressbar() {
			$('.inProgress').css({
				width: 0 + '%'
			});
			clearInterval(tick);
		}

		startProgressbar();

		$('.progress__item').click(function () {
			clearInterval(tick);
			var goToThisIndex = $(this).find("span").data("slickIndex");
			$('.carousel').slick('slickGoTo', goToThisIndex, false);
			startProgressbar();
		});
		// End ticking machine
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


// /*PRELOADER*/
$(window).load(function () {
	$('#preloader').delay(300).fadeOut();
});


/*MENU*/
$('#toggle').click(function () {
	$(this).toggleClass('active');
	$('#overlay').toggleClass('open');
	$('.main__wrap').toggleClass('none-events');
});



$(document).mouseup(function (e) {

	var $menu = $('#toggle');

	if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {

		$("#toggle").removeClass('active');
		$('.overlay').removeClass('open');
		$('.main__wrap').removeClass('none-events');
	}
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