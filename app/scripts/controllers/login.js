'use strict';

angular.module('soundcloudPlayerApp')
  .controller('LoginCtrl', function ($scope, Account, $state) {
    $scope.login = function login () {
      Account.connect().then(function () {
        $state.go('app.user.playlist', {user: 'me', playlist: 'stream'}, {location: true});
      });
    };
  });
