$(document).on('ready', function(){

    $('#u10657').hide();
    $("#menu-button").on('click', function(e){
        var menu = $('#u10657'),
            btn = $(this);

        if(btn.hasClass('menu__icon_close')){
            btn.removeClass('menu__icon_close');
            btn.addClass('menu__icon');
            menu.hide();
        }else{
            btn.addClass('menu__icon_close');
            btn.removeClass('menu__icon ');
            menu.show();
        }

        return false;
    });

    function _openApproverPopup(){
        var popup = $('.popup');

        popup.find('#hidden2').hide();
        popup.find('#approved2').show();

        if(!popup.is(':visible')){
            $('#popupCheckboxOne').prop('checked', true);
            popup.show();
        }
    }

    $('#popupCheckboxOne').on('change', function(){
        if(!$(this).is(':checked')){
            return true;
        }

        var popup = $('.popup');

        popup.find('#hidden2').show();
        popup.find('#approved2').hide();
    });

    $('#approved2').find('a.button').on('click', function(){
        $('#popupCheckboxOne').click();
        return false;
    });

    $('.regular').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1
    });

    $('body').on('click', '[href*="#"]', function(e){
        var fixed_offset = 60;
        $('html,body').stop().animate({
            scrollTop: $(this.hash).offset().top - fixed_offset
        }, 1500);

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