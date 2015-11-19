$(function(){
    var input = $('.calc_enter').val();


    $('.calc_enter').on( 'input', function() {

        input=0.6*$('.calc_enter').val();

            $('.result').html(input);

    });
    $('.slider').each(function () {
        Slider($(this).find('.swiper-container'));
    });

} );

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
