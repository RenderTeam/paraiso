/**
 * Insert into the element a tooltip
 * @param {DOM.element} The tooltip is gonna be added to this element
 * @param {String} This text is gona showed in tooltip
 * @return {null} This function doesn't return anything
 */

function tooltipConstructor ( element, text, position) {
  $( element ).tooltip({ 'trigger':'hover', 'title': text , 
    'placement': position});
}

