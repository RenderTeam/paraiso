function start(){
  $('#side-menu-trigger').sidr({
    source: '#side-menu'
  });

  $('#side-menu-trigger').on('mouseenter',openSideMenu);
  $('#sidr').on('mouseleave',closeSideMenu);
}

function openSideMenu(){
  $.sidr('open', 'sidr');
}

function closeSideMenu(){
  $.sidr('close', 'sidr');
}

$(document).ready(start);