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

// form submit 
$(function() {
	$('#order-form').on('submit', function(e) {
		e.preventDefault();

		var form = $(this),
		formData = form.serialize();


		$.ajax({
			url: '../mail.php',
			type: 'POST',
			data: formData,
			success: function(data) {

				var popup = data.status ? '#success' : '#error';

				// if (data.status) {

					$.fancybox.open([
						{href: popup}
					], {
						type: 'inline',
						maxWidth: 250,
						fitToView: false,
						padding: 0,
						afterClose: function() {
							form.trigger('reset');

						}
					});

				// } else {

				// 	$.fancybox.open([
				// 		{href: '#error'}
				// 	], {
				// 		type: 'inline',
				// 		maxWidth: 250,
				// 		fitToView: false,
				// 		padding: 0
				// 	})

				// }
			}

		});

	});

	$('.status-popup__close').on('click', function(e) {
		e.preventDefault();

		$.fancybox.close( );

	});
});

// google map
$(function() {


var mapGoogle = (function() {
  var init = function() {
    var uluru = { lat: 50.451014, lng: 30.522610 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: uluru,
      scrollwheel: false,
      styles: [
        {
          featureType: 'administrative.province',
          elementType: 'all',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [
            {
              saturation: -100
            },
            {
              lightness: '66'
            },
            {
              visibility: 'on'
            },
            {
              color: '#fffff7'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fcf3da'
            },
            {
              lightness: 40
            },
            {
              saturation: -40
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ef8c25'
            },
            {
              lightness: 40
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'all',
          stylers: [
            {
              saturation: -100
            },
            {
              lightness: 40
            },
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'all',
          stylers: [
            {
              saturation: -100
            },
            {
              visibility: 'simplified'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [
            {
              visibility: 'on'
            },
            {
              lightness: 30
            },
            {
              weight: '1.32'
            }
          ]
        }
      ]
    });
    var icons = {
      position: {
        icon: {
          url: '../img/icons/map-marker.svg',
          size: new google.maps.Size(40, 50),
          scaledSize: new google.maps.Size(40, 50)
        }
      },
      logo: {
        icon: {
          url: '../img/icons/favicon.png',
          size: new google.maps.Size(30, 30),
          scaledSize: new google.maps.Size(30, 30)
        }
      }
    };
    var features = [
      {
        position: new google.maps.LatLng(50.450382, 30.523769),
        type: 'position',
        contentString: 'First', // Тултип
        content: 'First market' // балун
      },
      {
        position: new google.maps.LatLng(50.451213, 30.522581),
        type: 'position',
        contentString: 'Second',
        content: 'Second market'
      },
      {
        position: new google.maps.LatLng(50.450800, 30.521624),
        type: 'position',
        // type: 'logo',
        contentString: 'Third',
        content: 'Third market'
      }
    ];

    var infowindow = new google.maps.InfoWindow();

    features.forEach(function(feature) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map,
        animation: google.maps.Animation.DROP,
        title: feature.contentString
      });
      marker.addListener('click', function() {
        infowindow.setContent(feature.content);
        infowindow.open(map, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 1400);
      });
    });
  };

  return { init: init };
})();

if ($('#map').length) {
  google.maps.event.addDomListener(window, 'load', mapGoogle.init);
}

});