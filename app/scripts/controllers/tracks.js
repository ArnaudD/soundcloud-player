'use strict';

angular.module('soundcloudPlayerApp')
  .controller('TracksCtrl', function ($scope, $stateParams, Account, Collection, Player) {

    var collection;

    if ($stateParams.user === 'me' && $stateParams.playlist === 'stream') {
      collection = Collection.getStream();
    }
    else {
      var username = ($stateParams.user === 'me' ? Account.profile.permalink : $stateParams.user);

      if ($stateParams.playlist === 'favorites') {
        collection = Collection.getFavorites(username);
      }
      else {
        collection = Collection.getFromSet(set, username);
      }
    }

    $scope.loading = true;

    collection.loadNext().then(function (tracks) {
      $scope.loading = false;
      $scope.tracks = collection.items;
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
