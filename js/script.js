var slider = document.getElementById('range');

noUiSlider.create(slider, {
	start: [1200, 8700],
	step: 1,
	margin: 1,
	connect: true,
	behaviour: 'tap-drag',
	range: {
		'min': 0,
		'max': 10000
	},
	format: wNumb({
		decimals: 0,
		thousand: ' '
	})
});

var minCostInput = document.getElementById('minCost'),
	maxCostInput = document.getElementById('maxCost');

// When the slider value changes, update the input and span
slider.noUiSlider.on('update', function (values, handle) {
	if (handle) {
		maxCostInput.value = values[handle];
	} else {
		minCostInput.value = values[handle];
	}
});

minCostInput.addEventListener('change', function () {
	slider.noUiSlider.set(this.value);
});

maxCostInput.addEventListener('change', function () {
	slider.noUiSlider.set([null, this.value]);
});


$(document).ready(function () {
	$('.spoller').click(function () {
		$(this).toggleClass('active');
		$(this).siblings('.spoller-body').slideToggle()
	})

	$('.catalogue__select_filter').on('click', function (event) {
		$('.filters-page__aside').fadeIn();
		// $('.filters-page .container').addClass('darken');
	});

	$('.filters-page__close-x').on('click', function (event) {
		$('.filters-page__aside').fadeOut();
		$('.filters-page .container').removeClass('darken');
	});
	
	
	if ($(window).width() <= '1365' && $(window).width() > '766') {
	$('.catalogue__select_filter').on('click', function (event) {
		$('.filters-page .container').addClass('darken');
	});
	}

	$.each($('.sizes__values'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$(document).on('click', '.sizes__value', function (event) {
		$(this).parents('.sizes__values').find('.sizes__value').removeClass('active');
		$(this).parents('.sizes__values').find('.sizes__value input').prop('checked', false);
		$(this).toggleClass('active');
		$(this).find('input').prop('checked', true);
		return false;
	});

	//filter-colors
	$.each($('#multipleColorSelect'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$(document).on('click', '#multipleColorSelect .colors__color', function (event) {
		$(this).toggleClass('active');
		$(this).find('input').prop('checked', true);
		return false;
	});

});
(function (e) {
	e.fn.hoverIntent = function (t, n, r) {
		var i = {
			interval: 100,
			sensitivity: 7,
			timeout: 0
		};
		if (typeof t === "object") {
			i = e.extend(i, t)
		} else if (e.isFunction(n)) {
			i = e.extend(i, {
				over: t,
				out: n,
				selector: r
			})
		} else {
			i = e.extend(i, {
				over: t,
				out: t,
				selector: n
			})
		}
		var s, o, u, a;
		var f = function (e) {
			s = e.pageX;
			o = e.pageY
		};
		var l = function (t, n) {
			n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
			if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
				e(n).off("mousemove.hoverIntent", f);
				n.hoverIntent_s = 1;
				return i.over.apply(n, [t])
			} else {
				u = s;
				a = o;
				n.hoverIntent_t = setTimeout(function () {
					l(t, n)
				}, i.interval)
			}
		};
		var c = function (e, t) {
			t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
			t.hoverIntent_s = 0;
			return i.out.apply(t, [e])
		};
		var h = function (t) {
			var n = jQuery.extend({}, t);
			var r = this;
			if (r.hoverIntent_t) {
				r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
			}
			if (t.type == "mouseenter") {
				u = n.pageX;
				a = n.pageY;
				e(r).on("mousemove.hoverIntent", f);
				if (r.hoverIntent_s != 1) {
					r.hoverIntent_t = setTimeout(function () {
						l(n, r)
					}, i.interval)
				}
			} else {
				e(r).off("mousemove.hoverIntent", f);
				if (r.hoverIntent_s == 1) {
					r.hoverIntent_t = setTimeout(function () {
						c(n, r)
					}, i.timeout)
				}
			}
		};
		return this.on({
			"mouseenter.hoverIntent": h,
			"mouseleave.hoverIntent": h
		}, i.selector)
	}
})(jQuery)

$(function () {
	$('.burger').click(function () {
		$(this).toggleClass('active');
		$('.header__secondary').toggleClass('active');
		if ($(window).width() <= '1365') {
			$('.offer').toggleClass('darken');
		};
	});

	if (~['Android', 'iPhone', 'iPod', 'iPad', 'BlackBerry'].indexOf(navigator.platform)) {
		$('.header__cart').css('visibility', 'hidden').css('opacity', '0');
	} else if ($(window).width() >= '768') {
		$('.header__actions-item_cart').mouseenter(function () {
			$('.header__cart').addClass('active');
			$('.header__cart').mouseleave(function () {
				$('.header__cart').removeClass('active');
			});
			$(document).click(function (e) {
				if ($(e.target).closest('.header__cart.active').length) {
					// клик внутри элемента 
					return;
				}
				// клик снаружи элемента 
				$('.header__cart').removeClass('active');
			});
		});

	};

	if ($(window).width() <= '1365') {
		$('.header__menu-link').click(function () {
			$(this).parent().children('.header__sub-menu').toggleClass('visible');

		});
	} else {

		$('.menu-item-has-children').hoverIntent(
			function () {
				$(this).addClass('active');
				$(this).find('.header__sub-menu').slideDown('fast');
			},


			function () {
				$(this).removeClass('active');
				$(this).find('.header__sub-menu').slideUp('fast', function () {
					$(this).stop(true, true);
				});
			}

		);

	}

	$('.secondary-back').click(function () {
		$('.header__menu').removeClass('invisible');
		$('.secondary-back, .header__secondary-menu').removeClass('visible');
	})


	let valueMeasure = $('.header__actions-amount_measure').attr('data-value');
	$('.header__actions-amount_measure').text(valueMeasure);

	let valueLIked = $('.header__actions-amount_liked').attr('data-value');
	$('.header__actions-amount_liked').text(valueLIked);

	let valueCart = $('.header__actions-amount_cart').attr('data-value');
	$('.header__actions-amount_cart').text(valueCart);
});

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) {
				return -1
			} else {
				return 1
			}
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) {
				return 1
			} else {
				return -1
			}
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');

//Слушаем изменение размера экрана
window.addEventListener('resize', move);

//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}

//Вызываем функцию
move();

*/;
// ======================Product card======================================================================================


$(function () {
	$('.product__preview').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		asNavFor: '.product__picture',
		vertical: true,
		verticalSwiping: true,
		focusOnSelect: true,

		responsive: [{
			breakpoint: 767,
			settings: {
				slidesToShow: 4
			}
		}]
	});
	$('.product__picture').slick({
		slidesToShow: 1,
		arrows: false,
		asNavFor: '.product__preview'
	});

	//colors
	$.each($('#singleColorSelect'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$(document).on('click', '#singleColorSelect .colors__color', function (event) {
		$(this).parents('.colors__values').find('.colors__color').removeClass('active');
		$(this).parents('.colors__values').find('.colors__color input').prop('checked', false);
		$(this).toggleClass('active');
		$(this).find('input').prop('checked', true);
		return false;
	});

	//sizes

	$.each($('.sizes__values'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$(document).on('click', '.sizes__value', function (event) {
		$(this).parents('.sizes__values').find('.sizes__value').removeClass('active');
		$(this).parents('.sizes__values').find('.sizes__value input').prop('checked', false);
		$(this).toggleClass('active');
		$(this).find('input').prop('checked', true);
		return false;
	});

	$('.slim-button').click(function () {
		$(this).toggleClass('done');
	});

	$('.js-tab-trigger').click(function () {
		var id = $(this).attr('data-tab'),
			content = $('.js-tab-content[data-tab="' + id + '"]');

		$('.js-tab-trigger.active').removeClass('active');
		$(this).addClass('active');

		$('.js-tab-content.active').removeClass('active');
		content.addClass('active');
	});

	if ($(window).width() >= '767') {
		//раскрытие карточки с таймаутом delay
		var timer;
		var delay = 1000;

		$('.card-product__head').hover(function () {
			$(this).addClass('hovered');
			timer = setTimeout(function () {
				$('.card-product .hovered').find('.sizes, .colors').slideDown(200);
			}, delay);
		}, function () {
				$('.card-product .hovered').find('.sizes, .colors').slideUp(100);
				$(this).removeClass('hovered');
			clearTimeout(timer);
		});


		$('.product__picture-slide').zoom();
	}

	$('.act__item').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});
});
;