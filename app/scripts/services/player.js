'use strict';

angular.module('soundcloudPlayerApp')
  .service('Player', function ($q) {

    var playingSound;

    return {

      play: function (track) {
        SC.stream("/tracks/" + track.id, function(sound){
          if (playingSound) {
            playingSound.stop();
          }
          sound.play();
          playingSound = sound;
        });
      }
    }

  });
