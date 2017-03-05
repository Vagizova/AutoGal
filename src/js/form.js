$(document).on('ready', function(){

    var auto_select = $('.podbor__select');

    function _openApproverPopup(){
        var popup = $('.popup');

        popup.find('#hidden2').hide();
        popup.find('#approved2').show();

        if(!popup.is(':visible')){
            $('#popupCheckboxOne').prop('checked', true);
            popup.show();
        }
    }

    auto_select.on('click', function(){
        if($(this).hasClass('loading') || $(this).hasClass('loaded')){
            return;
        }

        $(this).addClass('loading');
        $.get('http://api.auto.ria.com/categories/1/marks', function(response){
            for(var i = 0; i < response.length; i++){
                auto_select.append('<option>' + response[i].name + '</option>');
            }

            auto_select.addClass('loaded');
        }, 'json');
    });


    $('form.ajax-mail-form').on('submit', function(){
        var form = $(this),
            data = form.serializeArray();
        
        data.push({'name': 'type', 'value': form.data('type')});

        $.post('/scripts/send.php', data, function(response){
            if(response.status == 'error'){
                return;
            }

            _openApproverPopup();
        });

        return false;
    });

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

});