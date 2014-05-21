'use strict';

angular.module('soundcloudPlayerApp')
  .controller('TracksCtrl', function ($scope, $stateParams, Account, Tracks, Player) {

    var query;

    if ($stateParams.user === 'me' && $stateParams.playlist === 'stream') {
      query = Tracks.getStream();
    }
    else {
      var username = ($stateParams.user === 'me' ? Account.profile.permalink : $stateParams.user);

      if ($stateParams.playlist === 'favorites') {
        query = Tracks.getFavorites(username);
      }
      else {
        query = Tracks.getFromSet(set, username);
      }
    }

    query.then(function (tracks) {
      $scope.tracks = tracks;
    });

    $scope.play = function (track) {
      Player.play(track);
    }

  });
