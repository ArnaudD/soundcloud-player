'use strict';

angular.module('soundcloudPlayerApp')
  .service('Tracks', function ($q) {

    function fetch (url) {
      var defer = $q.defer();

      SC.get(url, function(result, error){
        if(error){
          defer.reject(error.message);
        }else{
          console.log(result);
          defer.resolve(result.length ? result : result.collection);
        }
      });

      return defer.promise;
    }

    return {

      getFavorites: function (username) {
        return fetch('/users/' + username + '/favorites.json');
      },

      getFromSet: function (set, username) {
        return fetch('/users/' + username + '/playlists/' + set + '.json');
      },

      getStream: function () {
        return fetch('/me/activities/tracks/affiliated.json');
      }
    }

  });
