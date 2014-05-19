'use strict';

angular.module('soundcloudPlayerApp')
  .service('Account', function ($q) {

    function loadProfile (deferred, account) {
      SC.get('/me.json', function(result, error){
        if(error){
          deferred.reject(error.message);
        }else{
          account.profile = result;
          deferred.resolve();
        }
      });
    }

    return {
      accessToken: null,
      connected: false,
      profile: null,

      connect: function (force) {
        var that = this,
            deferred = $q.defer();

        if (SC.isConnected()) {
          loadProfile(deferred, that);
          return deferred.promise;
        }

        if (force === false) {
          deferred.reject();
          return deferred.promise;
        }

        SC.connect(function(){
          that.connected = true;
          that.accessToken = SC.accessToken();
          loadProfile(deferred, that);
        });

        return deferred.promise;
      }
    }

  });
