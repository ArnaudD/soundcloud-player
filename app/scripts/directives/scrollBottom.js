angular.module('soundcloudPlayerApp')
  .directive('scScrollBottom', function($window, $timeout) {

    // Inspired by https://github.com/lorenzofox3/lrInfiniteScroll
    // TODO : PR
    return {
      link: function(scope, element, attr) {
        var
          lengthThreshold = attr.scrollThreshold || 50,
          timeThreshold = attr.timeThreshold || 400,
          handler = scope.$eval(attr.scScrollBottom),
          timer = null,
          paused = false,
          win = angular.element($window);

        lengthThreshold = parseInt(lengthThreshold, 10);
        timeThreshold = parseInt(timeThreshold, 10);

        if (!handler || !angular.isFunction(handler)) {
          handler = angular.noop;
        }

        win.bind('scroll', function() {

          //if we have reached the threshold and we scroll down
          if (this.pageYOffset >= lengthThreshold) {

            if (paused) {
              return;
            }

            //if there is already a timer running which has no expired yet we have to cancel it and restart the timer
            if (timer !== null) {
              $timeout.cancel(timer);
            }
            timer = $timeout(function() {
              paused = true;
              handler();
              timer = null;
            }, timeThreshold);
          }
          else {
            paused = false;
          }
        });
      }
    };
  });