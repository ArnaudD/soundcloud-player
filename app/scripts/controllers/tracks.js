'use strict';

angular.module('soundcloudPlayerApp')
  .controller('TracksCtrl', function ($scope, $stateParams, Account) {

    $scope.tracks = [];

    var url = '',
        username,
        resource;

    if ($stateParams.user === 'me' && $stateParams.playlist === 'stream') {
      url = '/me/activities/tracks/affiliated.json';
    }
    else {
      username = ($stateParams.user === 'me' ? Account.profile.permalink : $stateParams.user),
      resource = ($stateParams.playlist === 'favorites' ? '/favorites' : '/playlists/' + $stateParams.playlist );
      url = '/users/' + username + resource + '.json';
    }

    SC.get(url, function(result, error){
      if(error){
        alert('Error: ' + error.message);
      }else{
        $scope.$apply(function () {
          $scope.tracks = result.length ? result : result.collection;
        });
      }
    });

  });
