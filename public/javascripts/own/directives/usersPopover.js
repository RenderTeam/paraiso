var popover = angular.module( 'directives.usersPopover', [] );

popover.directive( 'usersPopover', popoverDirective );

popoverDirective.$inject = [ '$compile' ];
function popoverDirective ( compile ) {

  var itemsTemplate = "<div> <label ng-repeat = 'worker in items' >  <input type = 'checkbox' name = 'workers[]' value = '{{worker.username}}' ng-checked = 'selection.indexOf(worker.username) > -1' ng-click = 'toggleSelection(worker.username)' > </div> <div class='btn input-group-btn btn-success' ng-click = 'lol()'>Te amo</div></div>";
  var getTemplate = function (contentType) {
    var template = '';
    switch (contentType) {
      case 'items':
        template = itemsTemplate;
        break;
    }
    return template;
  }
  return {
    restrict: "A",
    transclude: true,
    template: "<span ng-transclude></span>",
    link: function (scope, element, attrs) {
      var popOverContent;
      if (scope.items) {
        var html = getTemplate("items");
        popOverContent = compile(html)(scope);
      }
      var options = {
        content: popOverContent,
        placement: "bottom",
        html: true,
        title: scope.title
      };
      $(element).popover(options);
    },
    scope: {
      items: '=',
      title: '@'
    }
  };
}