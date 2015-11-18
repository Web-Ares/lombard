$(function(){
    var input = $('.calc_enter').val();


    $('.calc_enter').on( 'input', function() {

        input=0.6*$('.calc_enter').val();

            $('.result').html(input);

    });
} );

var Shablon = function (obj) {
    this.obj = obj;


    this.init();
};



Shablon.prototype = {
    init: function () {
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function () {
        var self = this;

        return {
            addEvents: function () {

            },
            build: function () {
                self.core.addEvents();
            }
        };
    }
};

$(window).on({
    load: function () {
        
    }
});