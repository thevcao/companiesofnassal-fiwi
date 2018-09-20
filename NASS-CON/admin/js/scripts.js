(function ($) {

  'use strict';

  $('.pop-link').click(function () {
    var poplink = $(this).attr('href');

    newwindow = window.open(poplink, 'name', 'height=800,width=1024');
    if (window.focus) {
      newwindow.focus()
    }
    return false;
  })


  $('.login h1 a').click(function () {

    window.location = '/'

    return false;


  })




  $(document).ready(function(){

    var company = document.location.host;
    var company = company.split('.');

    $('body').addClass('' + company[0] + '');
  });

})(jQuery);
