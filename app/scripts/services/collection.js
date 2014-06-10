'use strict';

angular.module('soundcloudPlayerApp')
  .service('Collection', function ($q) {

    function fetch (url) {
      var defer = $q.defer();
      SC.get(url, function(data, error){

        if(error){
          defer.reject(error.message);
        }else{
          // console.log(data);

          var items = null;

          if (!data.length) {
            items = data.collection;
          }
          else if (data[0] && data[0].origin) {
            items = _.pluck(data, 'origin');
          }

          defer.resolve({items: items, next_href: data.next_href});
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
          firstId = that.items[0].id;

      return fetch(that.url).then(function (data) {
        var i = 0,
            items = data.items,
            l = items.length;

        for(; i < l; i++) {
          if (items[i].id === firstId) {
            break;
          }
        }

        if (i === l) {
          that.items.splice(items.length - that.items.length);
          that.nextUrl = data.next_href;
        }
        else {
          Array.protoype.unshift.apply(that.items, items.slice(0, i));
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
        that.nextUrl = data.next_href;
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