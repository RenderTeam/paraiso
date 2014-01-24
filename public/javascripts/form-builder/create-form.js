$( document ).on( ' ready', start );

  function start () {
    var createForm = $('.createForm');
    createForm.on( 'click', sendForm );
  }

  function getForm () {
    var renderedForm = $('#render').val();
    return renderedForm;
  }

  function sendForm () {
    $.post( "/send/form", { formSent: getForm() } );
  }
