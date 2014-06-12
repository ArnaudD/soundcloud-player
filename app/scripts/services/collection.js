'use strict';

angular.module('soundcloudPlayerApp')
  .service('Collection', function ($q) {

    function fetch (url) {
      var defer = $q.defer();
      SC.get(url, function(data, error){

        if(error){
          defer.reject(error.message);
        }else{
          // console.log('raw data', data);

          var items = null;

          if (data.collection) {
            items = data.collection;
          }
          else {
            items = data;
          }

          if (angular.isArray(items) && items.length && items[0].origin) {
            items = _.pluck(items, 'origin');
          }

          defer.resolve({
            items: items,
            nextUrl: data.next_href,
            futureUrl: data.future_href
          });
        }
      });

      return defer.promise;
    }

    function Collection (url) {
      this.items   = [];
      this.url     = url;
      this.nextUrl = null;
    };

    var cp = Collection.prototype;

    cp.refresh = function () {
      var that    = this,
          firstId = that.items[0].id,
          url     = that.futureUrl || that.url;

      return fetch(url).then(function (data) {
        var items = data.items,
            l = items.length,
            i = that.futureUrl ? l : 0;

        for(; i < l; i++) {
          if (items[i].id === firstId) {
            break;
          }
        }

        if (i === l && !that.futureUrl) {
          that.items.splice(items.length - that.items.length);
        }
        else {
          Array.prototype.unshift.apply(that.items, items.slice(0, i));
          that.futureUrl = data.futureUrl;

          if (!that.nextUrl) {
            that.nextUrl = data.nextUrl;
          }
        }

      }, function () {
        // Error, TODO
      });
    };


    cp.loadNext = function () {
      var that = this,
          url  = (that.nextUrl ? that.nextUrl : that.url);

      return fetch(url).then(function (data) {
        Array.prototype.push.apply(that.items, data.items);
        that.futureUrl = data.futureUrl;

        if (!that.nextUrl) {
          that.nextUrl = data.nextUrl;
        }
      }, function () {
        // Error, TODO
      });
    };

    var collectionCache = {};

    this.getCollection = function (url) {
      if (! collectionCache[url]) {
        collectionCache[url] = new Collection(url);
      }

      return collectionCache[url];
    };

    this.getFavorites = function (username) {
      return this.getCollection('/users/' + username + '/favorites.json?limit=200');
    };

    this.getFromSet = function (set, username) {
      return this.getCollection('/users/' + username + '/playlists/' + set + '.json?limit=200');
    };

    this.getStream = function () {
      return this.getCollection('/me/activities/tracks/affiliated.json?limit=200');
    };

  });