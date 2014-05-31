
angular.module('soundcloudPlayerApp')
  .controller('PlayerCtrl', function ($scope, Account, $state, Player) {

    $scope.player = Player;

    $scope.$on('statusChanged', function () {
      console.log('statusChanged');
      if(!$scope.$$phase) {
        $scope.$digest();
      }
    })

  });
