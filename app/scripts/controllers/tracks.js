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
      console.log(tracks);
      $scope.tracks = tracks;
    });

    $scope.play = function (track) {
      Player.play(track);
    }

    $scope.$on('finished', function () {
      var currentId = Player.currentTrack.id,
          tracks = $scope.tracks,
          l = tracks.length,
          i = 0;

      for (; i < l; i++) {
        if (tracks[i].id === currentId && i + 1 < l) {
          Player.play(tracks[i + 1]);
          return;
        }
      }
    });

  });
