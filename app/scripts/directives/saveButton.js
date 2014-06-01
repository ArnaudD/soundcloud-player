
angular.module('soundcloudPlayerApp')
  .directive('scSaveButton', function() {
    return {
      restrict: 'E',
      scope: {
        track: '='
      },
      template:
        '<a class="add-button">' +
          '<span class="fa-stack fa-lg">' +
            '<i class="fa fa-folder fa-stack-1x"></i>' +
            '<i class="fa fa-plus fa-stack-1x"></i>' +
          '</span>' +
        '</a>'
    };
  });
