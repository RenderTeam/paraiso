var autocomplete = angular.module( 'autoComplete', [] );
autocomplete.directive( 'autoComplete', autoComplete );
autoComplete.$inject = ['$timeout']
function autoComplete(timeout) {
  console.log('Hi');

  return function ( scope, iElement, iAttrs) {
    var hola = ['dsa','asd'];
    iElement.autocomplete({
        source: scope[iAttrs.uiItems],
        select: function() {
            timeout(function() {
              iElement.trigger('input');
            }, 0);
        }
    });
  }
}

