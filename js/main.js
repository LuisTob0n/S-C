;(function () {

	'use strict';

	// Cierra menú móvil al hacer clic fuera
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas')) {
					$('body').removeClass('offcanvas');
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
			}
		});
	};

	// Menú offcanvas
	var offcanvasMenu = function() {
		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas').find('li').removeClass('has-dropdown');

		$('.offcanvas-has-dropdown').mouseenter(function(){
			$(this).addClass('active').find('ul').slideDown(300, 'easeOutExpo');
		}).mouseleave(function(){
			$(this).removeClass('active').find('ul').slideUp(300, 'easeOutExpo');
		});

		$(window).resize(function(){
			if ($('body').hasClass('offcanvas')) {
				$('body').removeClass('offcanvas');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});
	};

	// Botón menú hamburguesa
	var burgerMenu = function() {
		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);
			if ($('body').hasClass('overflow offcanvas')) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();
		});
	};

	// Removido: contentWayPoint (animaciones de scroll)
	// Removido: dropdown con clases animate.css
	// Sustitución simple para dropdown sin animaciones
	var dropdown = function() {
		$('.has-dropdown').mouseenter(function(){
			$(this).find('.dropdown').stop(true, true).fadeIn(200);
		}).mouseleave(function(){
			$(this).find('.dropdown').stop(true, true).fadeOut(200);
		});
	};

	// Eliminado: testimonialCarousel (usa owlCarousel)

	// Botón ir arriba
	var goToTop = function () {
		$(document).ready(function () {
			$('.js-gotop').on('click', function (event) {
				event.preventDefault();
				$('html, body').animate({ scrollTop: 0 }, 500);
				return false;
			});
			$(window).scroll(function () {
				if ($(window).scrollTop() > 200) {
					$('.js-top').addClass('active');
				} else {
					$('.js-top').removeClass('active');
				}
			});
		});
	};

	// Loader
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	// Contador
	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0) {
			$('#fh5co-counter').waypoint(function(direction) {
				if (direction === 'down' && !$(this.element).hasClass('counted')) {
					setTimeout(counter, 400);
					$(this.element).addClass('counted');
				}
			}, { offset: '90%' });
		}
	};

	// Parallax solo en Windows
	var parallax = function () {
		var isWindows = /Win/i.test(navigator.platform) &&
			!/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

		if (isWindows && $.stellar) {
			$(window).stellar({
				horizontalScrolling: false,
				responsive: true,
				positionProperty: 'transform'
			});
		}
	};

	// Inicialización
	$(function () {
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		dropdown();
		goToTop();
		loaderPage();
		counterWayPoint();
	});

}());