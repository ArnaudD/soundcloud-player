'use strict';

angular.module('soundcloudPlayerApp')
  .controller('BootstrapCtrl', function ($scope, $state, Account) {
    Account.connect(false).then(function () {
      $state.go('app.user.playlist', {user: 'me', playlist: 'stream'}, {location: true});
    }, function () {
      $state.go('login');
    });
  });
