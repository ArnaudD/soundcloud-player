'use strict';

angular.module('soundcloudPlayerApp')
  .service('Account', function ($q) {

    var account = {
      accessToken: null,
      connected: false,
      profile: null
    };

    function loadProfile (deferred) {
      SC.get('/me.json', function(result, error){
        if(error){
          deferred.reject(error.message);
        }else{
          account.profile = result;
          deferred.resolve();
        }
      });
    }

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
