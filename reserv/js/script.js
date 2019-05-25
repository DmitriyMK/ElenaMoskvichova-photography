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
		/*    $("#grid").fadeTo(100, 0.1);*/
		$("#grid .grid-item").not("." + selectedClass).fadeOut().hide();
		$('.grid').masonry();
		setTimeout(function() {
			$("." + selectedClass).fadeIn();
			$('.grid').masonry();
			/*      $("#grid").fadeTo(100, 1);*/
		}, 300);

	});
});

$(function() {
	$('.lazy').Lazy({
		// your configuration goes here
		scrollDirection: 'vertical',
		effect: 'fadeIn',
		visibleOnly: true,
		onError: function(element) {
			console.log('error loading ' + element.data('src'));
		}
	});
});

/*POPUP SLIDER-GALLERY*/
jQuery(document).ready(function($) {
	$('a[data-rel^=lightcase]').lightcase();
});

$(function() {
	var $gallery = $('.blog__link').simpleLightbox();
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

	//E-mail Ajax Send
	$("form.callback").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
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



});