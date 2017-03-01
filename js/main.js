

$(document).on('ready', function() {
      $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        prevArrow: arrowleft,
	        nextArrow: arrowright
       
        
      });

      $("body").on('click', '[href*="#"]', function(e){
  var fixed_offset = 60;
  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
  e.preventDefault();
});
       });



// $('.var-width').slick({
//   infinite: true,
//   speed: 250,
// // определяем скорость перелистывания
 
//   slidesToShow: 1,
// //количество слайдов для показа
//   centerMode: true,
// //текущий слайд по центру
//   variableWidth: true
// //установим переменную ширину
// });
