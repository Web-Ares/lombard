$(function(){
    var input = $('.calc_enter').val();

    $('.calc_enter').on( 'input', function() {

            input=0.6*$('.calc_enter').val();
            input=input.toFixed(0);
            $('.result').html(input+' '+ '<span class="rub">P</span>');
            $('.placeholder').html('0');
            $(".calc_enter").attr("placeholder", "0");
    });

    $('.sites').each(function () {
        Sites($(this));
    });

    $('.slider').each(function () {
        Slider($(this).find('.swiper-container'));
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
                type : 'callback',
                name: $('#callback-popup__name').val(),
                phone: $('#callback-popup__phone').val(),
                time: $('#callback-popup__time').val()
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
} );

var Sites = function (obj) {
    //private properties
    var _self = this,
        _tail = obj.find($('.sites__tail')),
        _close = obj.find($('.sites__close')),
        _obj = obj;

    //private methods
    var _addEvents = function () {
            _tail.on({
                click: function () {
                    if (!_obj.hasClass('active')){
                        _obj.addClass('active');
                        //_tail.addClass('steel');
                    } else {
                        _obj.removeClass('active');
                        _tail.removeClass('steel');
                    }
                }
            })
            _close.on({
                click: function () {
                    _obj.removeClass('active');
                    _tail.removeClass('steel');
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

            $.each($('.map__item'), function(i){
                var curElem = $(this);

                if (curElem.attr('data-coord')) {
                    var coord = curElem.attr('data-coord').split(', ');

                    myMap.geoObjects.add(new ymaps.Placemark(
                        [coord[0], coord[1]],
                        {
                            iconContent: i+1,
                            balloonContentBody: curElem.find('a').text(),
                            hintContent: "Описание"
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
                self.scrollConteiner.css( {
                    paddingRight: 0
                } );
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
                self.core.setPopupContent( className );
                self.scrollConteiner.css( {
                    paddingRight: self.core.getScrollWidth()
                } );
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
