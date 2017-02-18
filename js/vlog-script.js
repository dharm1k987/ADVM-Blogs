$(document).ready(function () {
    
    
    
    
   $(".container-dharmik, .container-mirza, .container-vinit").mouseenter(function () {
       var bg = $(this).css('backgroundColor');
       
       var rgb = bg.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
       var value = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+0.5+')';
       console.log(value);
       $(this).stop().animate({backgroundColor: value}, 10);
       $(this).addClass('animate');


       
   });
    
    $(".container-dharmik, .container-mirza, .container-vinit").mouseleave(function () {
       var bg = $(this).css('backgroundColor');
       
       var rgb = bg.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
       var value = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+0.3+')';
       console.log(value);
       $(this).stop().animate({backgroundColor: value}, 50);
       $(this).removeClass('animate');


       
   });

    
    
  
});