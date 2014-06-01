

angular.module('soundcloudPlayerApp')
  .directive('scLikeButton', function() {
    return {
      restrict: 'E',
      scope: {
        trackId: '='
      },
      controller: function ($scope, $rootScope, Account) {

        $scope.$watch('trackId', function () {
          $scope.liked = Account.likes.indexOf($scope.trackId) !== -1;
          $scope.justLiked = false;
        })

        $scope.like = function (trackId) {
          $scope.liked = !$scope.liked;

          Account.like($scope.trackId, $scope.liked).then(function () {
            $rootScope.$broadcast('liked', $scope.trackId, $scope.liked);
          }, function () {
            // error happened, rollback changes
            $scope.liked = !$scope.liked;
            $rootScope.$broadcast('liked', $scope.trackId, $scope.liked);
          });
        }

        $rootScope.$on('liked', function (event, trackId, liked) {
          if ($scope.trackId === trackId) {
            $scope.liked = liked;
            $scope.justLiked = liked;
            // event.stopPropagation();
          }
        });

      },
      template:
        '<a class="like-button" ng-class="{active: liked, pulse: justLiked}" ng-click="like()">' +
          '<i class="fa fa-heart fa-lg"></i>' +
        '</a>'
    };
  });
