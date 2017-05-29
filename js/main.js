// one page scroll
$(function(){

	var sections = $('.section'),
		 display = $('.maincontent'),
		 inScroll = false;

	var scrollToSection = function(sectionEq) {
		var position = 0;

		if (!inScroll) {

			inScroll = true;

			position = (sections.eq(sectionEq).index() * -100) + '%';

			sections.eq(sectionEq).addClass('active')
			.siblings('').removeClass('active');

			display.css({
				'transform' : 'translate3d(0, ' + position + ', 0)'
			});

			setTimeout(function() {
				inScroll = false;

				$('.fixed-menu__item').eq(sectionEq).addClass('active')
				.siblings('').removeClass('active');

			}, 1300)
		}

		

	}

	$('.wrapper').on('wheel', function(e) {
		
		var deltaY = e.originalEvent.deltaY,
			 activeSection = sections.filter('.active'),
			 nextSection = activeSection.next(),
			 prevSection = activeSection.prev();

		if (deltaY > 0) { //скроллим вниз

			if (nextSection.length) {
				scrollToSection(nextSection.index());
			}
			
		}

		if (deltaY < 0) { //скроллим вверх

			if (prevSection.length) {
				scrollToSection(prevSection.index());
			}
			
		}

	});


	$('.fixed-menu__link, .nav__link, .header__order-link, .burger__order-link, .arrow').on('click', function(e) {
		e.preventDefault();

		var href = parseInt($(this).attr('href'));
	
		scrollToSection(href);

	});

	$(document).on('keydown', function(e) {
		var activeSection = sections.filter('.active'),
			 nextSection = activeSection.next(),
			 prevSection = activeSection.prev();
			

			 switch (e.keyCode) {
			 	case 39 :
			 	case 40 : // листаем вниз
			 		if (nextSection.length) {
			 			scrollToSection(nextSection.index());
			 		}
			 		break;
			 	case 37 :	
			 	case 38 : // листаем вверх
			 		if (prevSection.length) {
			 			scrollToSection(prevSection.index());
			 		}
			 		break;	
			 }

	});

});

// slider
$(document).ready(function(){

  var burgerCarousel = $('.burger-slider').owlCarousel({
  		items : 1,
  		loop : true

  });

  $('.burger-slider__btn--next').on('click', function(e) {
  		e.preventDefault();
  		burgerCarousel.trigger('next.owl.carousel');
  });

   $('.burger-slider__btn--prev').on('click', function(e) {
  		e.preventDefault();
  		burgerCarousel.trigger('prev.owl.carousel');
  });

});

// vertical acco
$(function() {

	$('.team-acco__trigger').on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
			 container = $this.closest('.team-acco'),
			 item = $this.closest('.team-acco__item'),
			 items = container.find('.team-acco__item'),
			 content = item.find('.team-acco__content'),
			 contents = container.find('.team-acco__content');


	if (!item.hasClass('active')) {

		item.addClass('active').siblings('').removeClass('active');
		contents.slideUp();
		content.slideDown();

	} else {

		item.removeClass('active');
		content.slideUp();

	}

	});

});

// horizontal acco
$(document).ready(function() {

	$('.menu-acco__trigger').on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
		container = $this.closest('.menu-acco'),
		item = $this.closest('.menu-acco__item'),
		items = container.find('.menu-acco__item'),
		activeItem = items.filter('.active'),
		content = item.find('.menu-acco__content'),
		activeContent = activeItem.find('.menu-acco__content');

		if(!item.hasClass('active')) {

			items.removeClass('active');
			item.addClass('active');
			activeContent.animate({
				'width' : '0px'
			});
			content.animate({
				'width' : '550px'
			});

		} else {

			item.removeClass('active');
			content.animate({
				'width' : '0px'
			});

		}
	});

	$(document).on('click', function(e) {
		var $this = $(e.target);

		if(!$this.closest('.menu-acco').length) {

			$('.menu-acco__content').animate({
				'width' : '0'
			});

			$('.menu-acco__item').removeClass('active');

		}
	});

});

// input mask
$(document).ready(function() {

	$('.phone-mask').inputmask('+38 (999) 999 99 99');

});

// fancybox 

$(document).ready(function() {
	$(".review__view").fancybox({
		type : 'inline',
		maxWidth : 460,
		fitToView : false,
		padding : 0
	});

	$('.full-review__close').on('click', function(e) {
		e.preventDefault();

		$.fancybox.close( );

	});
});
