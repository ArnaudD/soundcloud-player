'use strict';

angular.module('soundcloudPlayerApp')
  .service('Account', function ($q) {

    var account = {
      accessToken: null,
      connected: false,
      profile: null,
      likes: [],
      reposts: []
    };

    function loadProfile (deferred) {
      SC.get('/me.json', function(result, error){
        if(error){
          deferred.reject(error.message);
        }
        else {
          account.profile = result;
          deferred.resolve();
        }
      });

      SC.get('/e1/me/track_reposts/ids?linked_partitioning=1&limit=5000', function(result, error){
        if(error){
          deferred.reject(error.message);
        }
        else {
          account.reposts = result.collection;
        }
      });

      SC.get('/e1/me/track_likes/ids?linked_partitioning=1&limit=5000', function(result, error){
        if(error){
          deferred.reject(error.message);
        }
        else {
          account.likes = result.collection;
        }
      });
    };

    account.like = function (trackId, value) {
      var deferred = $q.defer();

      SC[value ? 'put' : 'delete']('/e1/me/track_likes/' + trackId, function(result, error){
        if(error){
          deferred.reject(error.message);
        }
        else {
          if (value) {
            account.likes.push(trackId);
          }
          else {
            var i = account.likes.indexOf(trackId);
            if (i !== -1) {
              account.likes.splice(i);
            }
          }
          deferred.resolve();
        }
      });

      return deferred.promise;
    };

    account.repost = function (trackId, value) {
      var deferred = $q.defer();

      SC[value ? 'put' : 'delete']('/e1/me/track_reposts/' + trackId, function(result, error){
        if(error){
          deferred.reject(error.message);
        }
        else {
          if (value) {
            account.reposts.push(trackId);
          }
          else {
            var i = account.reposts.indexOf(trackId);
            if (i !== -1) {
              account.reposts.splice(i);
            }
          }
          deferred.resolve();
        }
      });

      return deferred.promise;
    };

    account.connect = function (force) {
      var deferred = $q.defer();

      if (SC.isConnected()) {
        account.connected = true;
        loadProfile(deferred);
        return deferred.promise;
      }

      if (force === false) {
        deferred.reject('not connected');
        return deferred.promise;
      }

      SC.connect(function(){
        account.connected = true;
        account.accessToken = SC.accessToken();
        loadProfile(deferred, account);
      });

      return deferred.promise;
    };

    account.connect(false);

    return account;

  });
