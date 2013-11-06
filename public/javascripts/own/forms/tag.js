function Tag ( tag, value ) {
  this.tag = tag;
  this.attributes = new Array();
  this.childs = new Array();
  this.value = value;
}

Tag.prototype.addAttribute = function ( attribute ) {
  this.attributes.push( attribute );
}

Tag.prototype.addChild = function ( tag ) {
  this.childs.push( tag );
}

Tag.prototype.toHTML = function () {
  var HTML = '<',
      childString = '';

  HTML = HTML.concat( this.tag ).concat( ' ' );
  HTML = HTML.concat( this.attributes.join(' ') );
  HTML = HTML.concat('>').concat( this.value );

  this.childs.forEach( function ( element ){
    childString = childString.concat( element.toHTML() );
  });

  HTML = HTML.concat( childString );
  HTML = HTML.concat('</').concat( this.tag ).concat('>');

  return HTML;
}