let windowWidth = $(window).width();
const handleTouchMove = function (ev) {
    ev.preventDefault();
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
        languageFotoer.click(function () {
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
    $('.account-form_group input').click(function () {
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

$(function () {
    switchTheme();

    initWidthNavigationSub();
    communityInitWidth();
    testimonialSlide();
    eventLanguageFooter();
    formAccount();
    viewPass();
});