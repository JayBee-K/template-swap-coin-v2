let windowWidth = $(window).width();
const handleTouchMove = function (ev) {
	ev.preventDefault();
}

const navigationMobile = function (e) {
	if (windowWidth < 992) {
		$("#header #navigation > ul > li > ul").each(function (index) {
			$(this).prev().attr({
				"href": "#subNavigation_" + index,
				"data-toggle": "collapse"
			});
			$(this).attr({
				"id": "subNavigation_" + index,
				"class": "collapse list-unstyled mb-0",
				"data-parent": "#navigation"
			});
		})

		/*
		 * Call menu mobile
		 */
		let body = $('body'),
			hamburgerIconShow = $('#call-header_mobile');

		hamburgerIconShow.click(function (e) {
			if (!body.hasClass('is-show_navigation')) {
				body.attr({
					'class': 'is-show_navigation',
					'style': 'overflow-y: hidden'
				});
				document.addEventListener('touchmove', handleTouchMove, {passive: false});
			} else {
				body.attr({
					'class': '',
					'style': ''
				});
				document.removeEventListener('touchmove', handleTouchMove);
			}
		});

		$('#close-header_mobile, #header .header-overlay').click(function (e) {
			body.attr({
				'class': '',
				'style': ''
			});
			document.removeEventListener('touchmove', handleTouchMove);
		});
	}
}

const initWidthNavigationSub = function (e) {
	if (windowWidth > 1024) {
		let items = $('#navigation > ul > li > ul');
		$.map(items, function (item) {
			let itemChildren = $(item).children('li');
			if (itemChildren.length >= 9) {
				itemChildren.parent().addClass('navigation-type-2');
			} else if (itemChildren.length >= 6) {
				itemChildren.parent().addClass('navigation-type-1');
			} else {
				itemChildren.parent().addClass('navigation-type');
			}
		});
	}
}

const communityInitWidth = function () {
	if ($('#communityInitWidth .community-item').length > 0) {
		let communityItems = $('#communityInitWidth .community-item');
		$.map(communityItems, function (communityItem) {
			let communityItemLi = $(communityItem).find('.community-item_list ul li');
			if (communityItemLi.length === 1) {
				communityItemLi.closest('.community-item_list').css('width', 'calc(85px)');
			} else if (communityItemLi.length === 2) {
				communityItemLi.closest('.community-item_list').css('width', 'calc(300px * 2 / 3)');
			}
		});
	}
}

const testimonialSlide = function () {
	new Swiper('#slideTestimonial', {
		autoplay: {
			delay: 10000,
			disableOnInteraction: false,
		},
		speed: 1000,
		navigation: {
			nextEl: '#slideTestimonial .testimonial-button .swiper-button-next',
			prevEl: '#slideTestimonial .testimonial-button .swiper-button-prev',
		},
		pagination: {
			el: '#slideTestimonial .testimonial-pagination .swiper-pagination',
			clickable: true,
		},
	});
}

const eventLanguageFooter = function () {
	let languageFotoer = $('.footer-item_language');
	if (windowWidth > 1024) {
		languageFotoer.mouseenter(function () {
			languageFotoer.addClass('is-show');
		}).mouseleave(function () {
			languageFotoer.removeClass('is-show');
		});
	} else {
		languageFotoer.click(function (e) {
			languageFotoer.addClass('is-show');
		});
		$(document).mouseup(function (e) {
			let elm = languageFotoer;
			elm.is(e.target) || 0 !== elm.has(e.target).length || (
				elm.removeClass('is-show')
			)
		})
	}
}

const formAccount = function () {
	$('.account-form_group input').bind('keyup click', function () {
		$(this).parent().addClass('has-text');
		mouseOverInput($(this).parent());
	});

	function mouseOverInput(elm) {
		$(document).mouseup(function (e) {
			elm.is(e.target) || 0 !== elm.has(e.target).length || (
				checkValueInput(elm)
			)
		})
	}

	function checkValueInput(elm) {
		if (elm.find('input').val() === '') {
			elm.addClass('has-error').removeClass('has-success');
		} else {
			elm.addClass('has-success').removeClass('has-error');
		}
	}
}

const viewPass = function () {
	let btnViewPass = $('.account-form_group .account-form_viewpass');
	btnViewPass.click(function (e) {
		e.stopPropagation();
		let input = $(this).parent().children('input');
		if (input.attr('type') === 'password') {
			input.attr('type', 'text');
			$(this).children('i').attr('class', 'fas fa-eye-slash');
		} else {
			input.attr('type', 'password');
			$(this).children('i').attr('class', 'fas fa-eye');
		}
	});
}

const switchTheme = function () {
	const buttonChangeTheme = $('#changeTheme'),
		currentTheme = localStorage.getItem('theme');

	if (currentTheme) {
		$('html').attr('data-theme', currentTheme);
		if (currentTheme === 'light') {
			buttonChangeTheme.find('#light').hide();
			buttonChangeTheme.find('#dark').show();
		}
	}

	function setLocalStorageTheme(e) {
		if ($('html').attr('data-theme') === 'light') {
			$('html').attr('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
			buttonChangeTheme.find('#light').show();
			buttonChangeTheme.find('#dark').hide();
		} else {
			$('html').attr('data-theme', 'light');
			localStorage.setItem('theme', 'light');
			buttonChangeTheme.find('#light').hide();
			buttonChangeTheme.find('#dark').show();
		}
	}

	buttonChangeTheme.click(function () {
		setLocalStorageTheme();
	});
}

const dropdownCoin = function () {
	let actionElm = $('.dropdown-coin_btn');
	actionElm.click(function (e) {
		let elmParent = $(this).parent();
		e.stopPropagation();
		if (elmParent.hasClass('is-show')) {
			elmParent.removeClass('is-show');
		} else {
			elmParent.addClass('is-show');
		}
	});

	$(document).mouseup(function (e) {
		let elm = $('.dropdown-coin.is-show');
		elm.is(e.target) || 0 !== elm.has(e.target).length || (
			elm.removeClass('is-show')
		)
	});
}

const chooseDropdownCoin = function () {
	let elmChoose = $('.dropdown-coin .item-dropdown .item-dropdown_inner ul li a');
	elmChoose.click(function (e) {
		let img = $(this).data('image'),
			name = $(this).data('name'),
			removeActiveItems = $(this).closest('ul').children('li');
		setActiveParent = $(this).parent(),
			setDataElm = $(this).closest('.dropdown-coin.is-show'),
			setDataImageElm = setDataElm.children('.dropdown-coin_btn').find('img'),
			setDataTitleElm = setDataElm.children('.dropdown-coin_btn').find('span');

		removeActiveItems.removeClass('active');
		setActiveParent.addClass('active');
		setDataImageElm.prop('src', img);
		setDataTitleElm.text(name);
		setDataElm.removeClass('is-show');
	});
}

const copyClipBoard = function (value) {
	let createTextarea = document.createElement('textarea');
	createTextarea.style.cssText = 'position: absolute; left: -99999px';
	createTextarea.setAttribute("id", "textareaCopy");
	document.body.appendChild(createTextarea);
	let textareaElm = document.getElementById('textareaCopy');
	textareaElm.value = value;
	textareaElm.select();
	textareaElm.setSelectionRange(0, 99999);
	document.execCommand("copy");
	textareaElm.remove();
}

const callDropdownCoin = function (elm) {
	// Update 08-01
	let dropdown_coinElm = elm.closest('.group-item').find('.dropdown-coin');
	if (dropdown_coinElm.hasClass('show')) {
		dropdown_coinElm.removeClass('show');
	} else {
		dropdown_coinElm.addClass('show');
	}
}
var changeCoin = function (elm) {
	// Update 08-01
	let img = elm.data('image'),
		name = elm.data('name');

	elm.parents('.form-coin .group-item').find('.call-dropdownCoin img').prop('src', img);
	elm.parents('.form-coin .group-item').find('.call-dropdownCoin .title').text(name);
	elm.parents('.form-coin .dropdown-coin').removeClass('show');
}

const setTimeOrder = function () {
	if ($('.setTimeOrder').length) {
		$('.setTimeOrder').each(function () {
			let _this = $(this);
			let minuteTest = _this.find('[data-minutes]').attr('data-minutes'),
				secondTest = _this.find('[data-seconds]').attr('data-seconds'),
				time = `${minuteTest}:${secondTest}`;

			var interval = setInterval(function () {
				var timer = time.split(':');
				var minutes = parseInt(timer[0], 10);
				var seconds = parseInt(timer[1], 10);
				--seconds;
				minutes = (seconds < 0) ? --minutes : minutes;
				seconds = (seconds < 0) ? 59 : seconds;
				seconds = (seconds < 10) ? '0' + seconds : seconds;
				if (minutes < 0) {
					clearInterval(interval);
					_this.find('[data-minutes]').text('00');
					_this.find('[data-seconds]').text('00');
					time = `00:00`;
				} else {
					_this.find('[data-minutes]').text(`${(minutes < 10) ? '0' + minutes : minutes}`);
					_this.find('[data-seconds]').text(seconds);
					time = `${minutes}:${seconds}`;
				}
			}, 1000);
		})
	}
}

$(function () {
	switchTheme();
	navigationMobile();

	initWidthNavigationSub();
	communityInitWidth();
	testimonialSlide();
	eventLanguageFooter();
	formAccount();
	viewPass();
	dropdownCoin();
	chooseDropdownCoin();
	setTimeOrder();

	// Update 08-01
	$('.call-dropdownCoin').click(function () {
		callDropdownCoin($(this));
	});
	$(document).on("mouseup", function (e) {
		var o = $(".dropdown-coin.show");
		o.is(e.target) || 0 !== o.has(e.target).length
		|| (o.removeClass('show'))
	});
	$('body').on('click', '.chooseCoin > ul > li > a', function () {
		changeCoin($(this));
	})

	$('.copyClipBoard').click(function () {
		copyClipBoard($(this).attr('data-clipboard'));
	});

});