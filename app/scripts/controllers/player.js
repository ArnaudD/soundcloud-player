
angular.module('soundcloudPlayerApp')
  .controller('PlayerCtrl', function ($scope, Account, $state, Player) {

    $scope.player = Player;

    $scope.$on('statusChanged', function () {
      if(!$scope.$$phase) {
        $scope.$digest();
      }
    });

    $scope.$watch('player.currentTrack.id', function () {
      angular.element('.tracks li.playing').removeClass('playing');

      if (Player.currentTrack && Player.currentTrack.id) {
        angular.element('#track-' + Player.currentTrack.id).addClass('playing');
      }
    });

    $scope.setPosition = function(e) {
      var positionPercent = (e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
      Player.setPosition(positionPercent);
    };

  });
