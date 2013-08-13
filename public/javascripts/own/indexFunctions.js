function start(){
  //variables
  var urlPathname = window.location.pathname;

  switch(urlPathname){
    case '':      
      $('#mainSiteNav').find('li').removeClass('active');
      $('#mainSiteNav').find('li:first').addClass('active');
    break;
    case '/caler':
      $('#mainSiteNav').find('li').removeClass('active');
      $('#mainSiteNav').find('li:first').next().addClass('active');
    break;
    case '/contacto':
      $('#mainSiteNav').find('li').removeClass('active');
      $('#mainSiteNav').find('li:last').addClass('active');
    break;
    case '/servicios':
      $('#mainSiteNav').find('li').removeClass('active');
      $('#mainSiteNav').find('li:last').prev().prev().addClass('active');
      $('.navbar-fixed-top').css('position', 'static');
      $('#layoutLine').remove();
      
      setFixMenu('.service-menu','fixedMenu'); 
    break;
    case '/capacitaciones':
      $('#mainSiteNav').find('li').removeClass('active');
      $('#mainSiteNav').find('li:last').prev().addClass('active');
    break;
  }

  $('.advice').on('click',scrollSmooth);
  $('.audit').on('click',scrollSmooth);
  $('.course').on('click',scrollSmooth);
  $('.to-top').on('click',scrollTop);
}

function scrollSmooth(){
  var id = $(this).parent().data('anchor-id');
  if($(this).closest('.span12').hasClass('fixedMenu')){
    $('html, body').animate({
        scrollTop: ($(id).offset().top)
    }, 800);
    return false;
  }else{
    $('html, body').animate({
        scrollTop: ($(id).offset().top -160)
    }, 800);
    return false;
  }
}

function scrollTop(){
  $('html, body').animate({
      scrollTop: -($(this).offset().top)
  }, 1000);
}
  
function setFixMenu(element,stickyCssClass) { 
  $(window).scroll(function(){ 
    var menuTop = $(element).offset(); 
    // get total scrolling 
    var htmlTop = $(window).scrollTop(); 
    if ((htmlTop + 1) > menuTop.top) { 
      $(element).addClass(stickyCssClass);
    }

    if(htmlTop < 110){
      $(element).removeClass(stickyCssClass); 
    }
  }); 
}

$(document).on('ready', start);