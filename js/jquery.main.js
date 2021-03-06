$(function(){
    var input = $('.calc_enter').val();

    $('.calc_enter').on( 'input', function() {

            input=0.6*$('.calc_enter').val();
            input=input.toFixed(0);
            input=input.toString();
            return_val = input.replace(/[^\d]/g, "").replace(/(\d)(?=(?:\d{3})+$)/g, "$1 ");

            $('.result').html(return_val+' '+ '<span class="rub">P</span>');
            $('.placeholder').html('0');
            $(".calc_enter").attr("placeholder", "0");
    });

    /*------------*/
    start = $(".site__header").offset().top + $(".site__header").outerHeight();
    navigation();

    $(window).scroll(function() {
        navigation();
    })

    function navigation(){
        scrolling = $(window).scrollTop();
        console.log(start)
        if (scrolling > start) {
            $('.site__header').addClass('header-fix')
        }
        else{
            $('.site__header').removeClass('header-fix')
        }
    }
    /*------------*/

    $('.sites').each(function () {
        Sites($(this));
    });

    $('.slider').each(function () {
        Slider($(this).find('.swiper-container'));
    });

    $('.site__header').each(function () {
        mobileMenu($(this));
    });

    $('.sub-menu').each(function () {
        subMenu($(this));
    });

    $('.popup').each(function(){
        popup = new Popup($(this));
    });

    $('.callback__form').submit(function () {
        $.ajax({
            url: 'php/form.php',
            dataType: 'html',
            timeout: 20000,
            type: "GET",
            data: {
                service : 'callback-popup__service',
                name: $('#callback-popup__name').val(),
                phone: $('#callback-popup__phone').val(),
                message: $('#callback-popup__message').val()
            },
            success: function (msg) {
                popup.core.show('thanks');
                setTimeout(function () {
                    popup.core.hide('thanks')
                }, 3000);
            },
            error: function (XMLHttpRequest) {
                if (XMLHttpRequest.statusText != "abort") {
                    alert(XMLHttpRequest.statusText);
                }
            }
        });
        return false;
    });

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            $.ajax({
                url: 'php/geolocation.php',
                data: {
                    lat : latitude,
                    lng: longitude
                },
                dataType: 'json',
                type: "get",
                success: function (msg) {

                   if (msg.html) {
                       $('.popup .popup__wrap').append(msg.html);

                       $('.popup').each(function(){
                           popup = new Popup($(this));
                       });

                       popup.core.show('geolocation');
                   }

                },
                error: function (XMLHttpRequest) {
                    if (XMLHttpRequest.statusText != "abort") {
                        alert(XMLHttpRequest.statusText);
                    }
                }
            });
        });
    }
} );

var Sites = function (obj) {
    //private properties
    var _self = this,
        _wrap = obj.find($('.site__header-layout')),
        _tail = obj.find($('.sites__tail')),
        _close = obj.find($('.sites__close')),
        _obj = obj;

    //private methods
    var _addEvents = function () {
            _tail.on({
                click: function () {
                    if (!_obj.hasClass('active')){
                        _obj.addClass('active');
                        _wrap.slideDown(300);
                    } else {
                        _obj.removeClass('active');
                        _wrap.slideUp(300);
                    }
                }
            })
            _close.on({
                click: function () {
                    _obj.removeClass('active');
                    _wrap.slideUp(300);
                }
            })
        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};

var Slider = function (obj) {

    //private properties
    var _self = this,
        _pagination = obj.find($('.swiper-pagination')),
        _obj = obj;

    //private methods
    var _init = function () {
        var swiper = new Swiper(_obj, {
            //autoplay: 5000,
            pagination: _pagination,
            paginationClickable: true,
            loop: true,
            loopedSlides: 3,
            slidesPerView: 'auto',
            centeredSlides: true
        });
    };

    _init();


        var myMap;

        function init () {
            myMap = new ymaps.Map('map', {
                center: $('.map__item').eq(0).attr('data-coord').split(', '),
                zoom: 12
            });

            myMap.behaviors.disable('drag');

            $.each($('.map__item'), function(i){
                var curElem = $(this);

                if (curElem.attr('data-coord')) {
                    var coord = curElem.attr('data-coord').split(', ');

                    myMap.geoObjects.add(new ymaps.Placemark(
                        [coord[0], coord[1]],
                        {   hintContent: "Описание",
                            balloonContentBody: curElem.find('a').text() }, {
                            iconLayout: 'default#image',
                            iconImageHref: 'img/map_icon.png',
                            iconImageSize: [30, 30],
                            iconImageOffset: [-15, -25]
                        }
                    ));
                }
            });
        }

        ymaps.ready(init);

        $('.map__item span').on({
            'click':function(){
                var coord = $(this).parent().attr('data-coord').split(', ');

                myMap.setCenter(coord);

                return false;
            }
        });


};

var mobileMenu = function (obj) {
    //private properties
    var _obj = obj,
        _menu = $('.header-menu'),
        _openBtn = $('.menu-icon'),
        _closeBtn = $('.close-menu'),
        _site = $('.site'),
        _window = $(window),
        _windowWidth = $(window).width();

    //private methods
    var _addEvents = function () {
            _window.on({
                resize: function () {
                    _windowWidth = $(window).width();
                    if(_windowWidth<=1006){
                        _obj.removeClass('open-menu');
                        _openBtn.removeClass('close-menu');
                    } else {
                        _menu.css('display','block');
                        _menu.removeClass('mobile-menu');
                    }

                }
            });
            _openBtn.on({
                click: function () {
                    if (_openBtn.hasClass('close-menu')){
                        _openBtn.removeClass('close-menu');
                        _obj.removeClass('open-menu');
                        _menu.removeClass('mobile-menu');
                    } else {
                        _openBtn.addClass('close-menu');
                        _obj.addClass('open-menu');
                        _menu.addClass('mobile-menu');
                    }
                }
            });
        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};

var subMenu = function (obj) {
    //private properties
    var _obj = obj,
        _site = $('.site'),
        _sub = _obj.children('ul'),
        _btn = _obj.children('a'),
        _window = $(window),
        _windowWidth = $(window).width();

    //private methods
    var _addEvents = function () {

            _windowWidth = $(window).width();

            _window.on({
                resize: function () {
                    if(_windowWidth<=749){
                        //$('.header__menu li').removeClass('active');
                        //$('.header__menu li ul').css('display','none');
                        _sub.css('display','block');
                    }
                }
            });
            _btn.on({
                click: function () {
                    if (_obj.hasClass('mobile-active')){
                        _sub.slideUp(500);
                        _obj.removeClass('mobile-active');
                    } else {
                        $('.menu li').removeClass('mobile-active');
                        $('.menu li ul').slideUp(500);
                        $(this).parent('li').addClass('mobile-active');
                        _sub.slideDown(500);
                    }
                    return false
                }
            });
        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};

var Popup = function( obj ){
    this.popup = obj;
    this.btnShow = $('.popup__open');
    this.btnClose = obj.find( '.popup__close, .popup__cancel' );
    this.wrap = obj.find($('.popup__wrap'));
    this.contents = obj.find($('.popup__content'));
    this.window = $( window );
    this.scrollConteiner = $( 'html' );
    this.timer = setTimeout( function(){},1 );

    this.init();
};

Popup.prototype = {
    init: function(){
        var self = this;
        self.core = self.core();
        self.core.build();
    },
    core: function (){
        var self = this;
        return {
            build: function (){
                self.core.controls();
            },
            centerWrap: function(){
                if ( self.window.height() - 80 - self.wrap.height() > 0 ) {
                    self.wrap.css({top: ( ( self.window.height() -80 )- self.wrap.height())/2});
                } else {
                    self.wrap.css({top: 0});
                }
            },
            controls: function(){
                self.window.on( {
                    resize: function(){
                        self.core.centerWrap();
                    }
                } );
                $('body').on( 'click','.popup__open', function(){
                    var curItem = $( this),
                        parentDropdown = curItem.parents(".dropdown"),
                        linkDropdown = parentDropdown.find("a[data-toggle=dropdown]");
                    parentDropdown.removeClass("open");
                    linkDropdown.attr("aria-expanded", "false");
                    self.core.show( curItem.attr( 'data-popup' ) );
                    popup.btnClose = self.popup.find(".popup__close");
                    return false;
                } );
                self.wrap.on( {
                    click: function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );
                self.popup.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
                self.btnClose.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
            },
            hide: function(){
                self.popup.css ({
                    'overflow-y': "hidden"
                });
                self.scrollConteiner.css({
                    paddingRight: 0,
                    'overflow-y': "scroll"
                });
                self.popup.removeClass('popup_opened');
                self.popup.addClass('popup_hide');
                location.hash = '';
                setTimeout( function(){
                    self.popup.removeClass('popup_hide');
                }, 300 );
            },
            getScrollWidth: function (){
                var scrollDiv = document.createElement("div");
                scrollDiv.className = "popup__scrollbar-measure";
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            },
            show: function( className ){
                if (self.contents.height()+120 > self.window.height()){
                    self.popup.css ({
                        'overflow-y': "scroll"
                    });
                    self.scrollConteiner.css( {
                        'overflow-y': "hidden",
                        paddingRight: 17
                    });
                }
                self.core.setPopupContent( className );
                //console.log(self.core.getScrollWidth());
                self.popup.addClass('popup_opened');
                self.core.centerWrap();
                $('.popup_opened').find('textarea').focus();
            },
            setPopupContent: function( className ){
                self.contents = self.popup.find('.popup__content');
                var curContent = self.contents.filter( '.popup__' + className );
                self.contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            }

        };
    }
};
