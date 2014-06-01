
angular.module('soundcloudPlayerApp')
  .directive('scRepostButton', function() {
    return {
      restrict: 'E',
      scope: {
        trackId: '='
      },
      controller: function ($scope, $rootScope, Account) {

        $scope.$watch('trackId', function () {
          $scope.reposted = Account.reposts.indexOf($scope.trackId) !== -1;
          $scope.justReposted = false;
        })

        $scope.repost = function (trackId) {
          $scope.reposted = !$scope.reposted;

          Account.repost($scope.trackId, $scope.reposted).then(function () {
            $rootScope.$broadcast('reposted', $scope.trackId, $scope.reposted);
          }, function () {
            // error happened, rollback changes
            $scope.reposted = !$scope.reposted;
            $rootScope.$broadcast('reposted', $scope.trackId, $scope.reposted);
          });
        }

        $rootScope.$on('reposted', function (event, trackId, reposted) {
          if ($scope.trackId === trackId) {
            $scope.reposted = reposted;
            $scope.justReposted = reposted;
            // event.stopPropagation();
          }
        });

      },
      template:
        '<a class="repost-button" ng-class="{active: reposted, spin: justReposted}" ng-click="repost()">' +
          '<i class="fa fa-retweet fa-lg"></i>' +
        '</a>'
    };
  });
