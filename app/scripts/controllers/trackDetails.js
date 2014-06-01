'use strict';

angular.module('soundcloudPlayerApp')
  .controller('TrackDetailsCtrl', function ($scope, $rootScope, Account, Player) {

    $rootScope.showTrackDetails = function (track) {
      $rootScope.trackSelected = track;
    }

  });
