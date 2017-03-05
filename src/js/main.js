$(document).on('ready', function(){

    $('.regular').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        prevArrow: arrowleft,
        nextArrow: arrowright
    });

    $('body').on('click', '[href*="#"]', function(e){
        var fixed_offset = 60;
        $('html,body').stop().animate({
            scrollTop: $(this.hash).offset().top - fixed_offset
        }, 1000);

        e.preventDefault();
    });

    $('.causes__item').hover(
        function(){ // on mouse over
            $(this).addClass('flip')
        },
        function(){ // on mouse out
            $(this).removeClass('flip')
        }
    );

});