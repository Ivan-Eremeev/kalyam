//  Ivan Eremeev - 2021
//  Skype: ivan.eremeev_1
//  Telegram: IvanMessage
//  Email: ivan.frontcoder@gmail.com

$(document).ready(function () {

	// Брэйкпоинты js
	var	breakXl = 1400,
			breakLg = 1200,
			breakMd = 1025,
			breakSm = 769,
			breakXs = 500;
	
	//= libs-settings/slick_settings.js

	// Stiky menu // Липкое меню.
	function stikyMenu(header) {
		headerTop = header.offset().top;
		$(window).scroll(function(){
			if( $(window).scrollTop() > headerTop ) {
				header.addClass('stiky');
			} else {
				header.removeClass('stiky');
			}
		});
	};
	stikyMenu($('#header'));

	// Аккордеон
	function accordion() {
		if ($('.accordion').length) {
			$('.accordion').each(function () {
				var accordion = $(this),
					trigger = accordion.find('.accordion__trigger'),
					time = 300;
				trigger.on('click', function () {
					var $thisTrigger = $(this),
						data = $thisTrigger.data('trigger');
					if (!$thisTrigger.hasClass('active')) {
						$thisTrigger.addClass('active');
						accordion.find('#' + data).stop().slideDown(
							time,
							function () {
								$(this).addClass('open')
							}
						);
					} else {
						$thisTrigger.removeClass('active');
						accordion.find('#' + data).stop().slideUp(
							time,
							function () {
								$(this).removeClass('open')
							}
						);
					}
				})
			})
		}
	}
	accordion();

	// Выпадайки при клике по кнопке
	// Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function dropBlock(btn) {
		var $this = undefined,
				drop = undefined,
				close = $('.js-drop-close');
		btn.on('click', function () {
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('is-active');
			drop.toggleClass('open');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('is-active');
					drop.removeClass('open');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
			$('#' + $(this).data('drop')).removeClass('open');
		})
	}
	dropBlock($('.js-drop-btn'));

	// Раскрывание поиска в мобилке
	function searchSlide() {
		var search = $('.js-search-slide'),
				button = search.find('button');
		button.on('click', function (e) {
			if ($(window).width() <= breakXs) {
				e.preventDefault();
				if (!button.hasClass('active')) {
					button.addClass ('active');
					search.addClass('open');
				}else {
					button.removeClass('active');
					search.removeClass('open');
				}
			}else {
				return false;
			}
		})
		$(window).resize(function () {
			if ($(window).width() > breakXs) {
				button.removeClass('active');
				search.removeClass('open');
			}else {
				return false;
			}
		})
		$(document).mouseup(function (e) { // клик по любому месту страницы вне блока (скрываем все выпадайки)
			if (!search.is(e.target)
				&& search.has(e.target).length === 0) {
				button.removeClass('active');
				search.removeClass('open');
			}
		});
	}
	searchSlide();

	// Inputmask
	if ($('.mask-tel').length) {
		$('.mask-tel').inputmask('+9(999) 999-99-99');
	}
	if ($('.mask-email').length) {
		$('.mask-email').inputmask('*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]');
	}
	if ($('.mask-verify').length) {
		$('.mask-verify').inputmask('999-999');
	}
	if ($('.mask-cardnum').length) {
		$('.mask-cardnum').inputmask('9999 9999 9999 9999');
	}
	if ($('.mask-date').length) {
		$('.mask-date').inputmask('99/99');
	}
	if ($('.mask-cvc').length) {
		$('.mask-cvc').inputmask('999');
	}

	// JQueryScrollbar
	if ($('.scrollbar-inner').length) {
		$('.scrollbar-inner').scrollbar({
			autoScrollSize: false,
		});
	}

	// Смена положения блока при изменении ширины окна
	// function(блок, куда переместить, куда вернуть)
	function replace(block, to, from, mediaBreak) {
		function replaceToggle() {
			if ($(window).width() <= mediaBreak) { // условие на ширину окна
				block.appendTo(to); // Переместить блок
			} else {
				block.appendTo(from); // Вернуть блок обратно
			}
		}
		replaceToggle();
		$(window).resize(function () {
			replaceToggle();
		})
		
	}
	replace($('#active-orders'), $('#to'), $('#from'), breakLg);

	// Изменение вида каталога
	function catalogView() {
		var btn = $('.filters__view'),
				card = $('.card'),
				col = $('.category__col');
		btn.on('click', function () {
			if (!$(this).hasClass('active')) {
				var $this = $(this);
				if ($this.attr('id') == 'viewTile') {
					btn.removeClass('active');
					$this.addClass('active');
					card.removeClass('card--list');
					col.removeClass('category__col--list');
				}else if ($this.attr('id') == 'viewList') {
					btn.removeClass('active');
					$this.addClass('active');
					card.addClass('card--list')
					col.addClass('category__col--list')
				}
			}else {
				return false;
			}
		})
	}
	catalogView();

	// Добавление/убавление количества товара в корзину c Inputmask
	function spinner() {
		if ($('.card__addcart-count').length) {
			$('.card__addcart-count').each(function () {
				var spinner = $(this),
					input = spinner.find('.card__count-input'),
					plus = spinner.find('.card__count-btn--plus'),
					minus = spinner.find('.card__count-btn--minus'),
					val = 1;
				input.inputmask({
					mask: '9{1,3} шт',
					placeholder: '1'
				});
				input.on('change', function () {
					val = input.inputmask('unmaskedvalue');
				})
				plus.on('click', function () {
					if (val < 999) {
						val++;
						input.inputmask('setvalue', val);
					}
				});
				minus.on('click', function () {
					if (val > 1) {
						val--;
						input.inputmask('setvalue', val);
					}
				});
			});
		}
	}
	spinner()

	// // Подстановка значения из инпута в блок
	// function valFromInput(input, block) {
	// 	input.on('input', function () {
	// 		block.text($(this).val());
	// 	})
	// }
	// valFromInput($('#name'), $('#nameTo'));
	// valFromInput($('#tel'), $('#telTo'));

	// // Подстановка значения из селекта в блок
	// function valFromSelect(select, block) {
	// 	select.bind('DOMSubtreeModified', function () {
	// 		block.text($(this).text().toLowerCase());
	// 	}
	// )}
	// valFromSelect($('#time'), $('#timeTo'));
	// valFromSelect($('#delivery'), $('#deliveryTo'));
	// valFromSelect($('#pay'), $('#payTo'));

	// Air Datepicker
	if ($("#datepicker").length) {
		$("#datepicker").on('input', function (e) {
			e.target.value = '';
		})
		var datepicker = $("#datepicker").datepicker({
			showOtherYears: false,
			selectOtherYears: false,
			onSelect: function (fd) {
				$('#datepickerTo').text(fd);
			}
		}).data('datepicker');
		$('.datepicker--content').append('<div class="btn">Готово</div>');
		var btn = $('.datepicker').find('.btn');
		btn.on('click', function () {
			datepicker.hide();
		})
	}

	// Селекты в оформлении товара
	function select(block, nohide=true) {
		block.each(function () {
			var select = $(this),
					trigger = select.find('.order__trigger'),
					drop = select.find('.order__drop'),
					input = select.find('input');
			input.on('change', function () {
				if (nohide == true) {
					drop.find('li').removeClass('hide');
					$(this).parent('li').addClass('hide');
				}
				trigger.find('span').text($(this).siblings('label').text());
				trigger.removeClass('is-active');
				drop.removeClass('open');
			})
		})
	}
	select($('.js-select'));
	select($('.js-select-nohide'), false);

});