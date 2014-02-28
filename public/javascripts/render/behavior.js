/**
 * Insert into the element a tooltip
 * @param {DOM.element} The tooltip is gonna be added to this element
 * @param {String} This text is gona showed in tooltip
 * @return {null} This function doesn't return anything
 */

function tooltipConstructor ( element, text, position) {
  $( element ).tooltip({
    'trigger':'hover',
    'title': text,
    'placement': position
  });
}
function newNotification( position, text, type){
  var notification = {
        title:text,
        position:position
      },
      notifications = $('.notifications'),
      notificationRender = $('<div hidden></div>').
      append(notification.title);
      notification.title = text;
      var elementclase = '',glyps='';
      switch(type){
        case 'info':
          elementclase = 'alert alert-'+type;
          glyps = 'glyphicon glyphicon-exclamation-sign pull-right';
        break;
        case 'success':
          elementclase = 'alert alert-'+type;
          glyps = 'glyphicon glyphicon-ok-sign pull-right';
        break;
        case 'danger':
          elementclase = 'alert alert-'+type;
          glyps = 'glyphicon glyphicon-remove-sign pull-right';
        break;
        case 'default':
          elementclase = 'alert alert-warning';
        break;
  }
  var span = $('<span></span>').addClass(glyps);
  notificationRender.append(span).appendTo(notifications).addClass(elementclase).slideDown('200');
  notificationRender.on('click',function(){
    $(this).slideUp();
  });
}