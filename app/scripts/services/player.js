'use strict';

angular.module('soundcloudPlayerApp')
  .service('Player', function ($rootScope) {

    var playingSound;

    return {

      playing: false,

      play: function (track) {

        if (!track) {
          if (this.currentTrack && playingSound) {
            playingSound.play();
            this.playing = true;
            $rootScope.$broadcast('statusChanged', true);
          }

          return;
        }

        var player = this;

        SC.stream("/tracks/" + track.id, function(sound){
          if (playingSound) {
            playingSound.stop();
          }

          sound.play({
            whileplaying: function () {
              player.duration = Math.floor(this.durationEstimate / 1000);
              player.position = Math.floor(this.position / 1000);
              player.progress = (this.position / this.durationEstimate) * 100;
              $rootScope.$broadcast('statusChanged', true);
            }
          });

          playingSound = sound;
          player.currentTrack = track;
          player.playing = true;
          $rootScope.$broadcast('statusChanged', true);
        });
      },

      pause: function () {
        if (playingSound) {
          playingSound.pause();
          this.playing = false;
          $rootScope.$broadcast('statusChanged', true);
        }
      }
    }

  });
