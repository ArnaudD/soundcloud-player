'use strict';

angular.module('soundcloudPlayerApp')
  .filter('time', function() {
    return function(seconds) {

      var output,
          secondsPart = seconds % 60,
          minutesPart = Math.floor(seconds / 60) % 60,
          hoursPart   = Math.floor(seconds / 60 / 60);

      output = secondsPart < 10 ? '0' + secondsPart : secondsPart;

      output = minutesPart + ':' + output

      if (hoursPart) {
        output = hoursPart + ':' + (minutesPart < 10 ? '0' + output : output)
      }

      return output;
    };
  });
