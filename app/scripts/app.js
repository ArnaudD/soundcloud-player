'use strict';

angular.module('soundcloudPlayerApp', [
  'ui.router',
  'angularMoment'
])

  .run(function ($rootScope, $state) {

    $rootScope.$on('$stateChangeError',  function(event, toState, toParams, fromState, fromParams, error){
      if (error === 'not connected') {
        $state.go('login', {}, {location: true});
      }
    });

    $rootScope.logout = function () {
      localStorage.clear();
      $state.go('login', {}, {location: true});
    }

  })
  .config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    var accountResolver = {
      account: ['Account', function (Account) {
        return Account.connect(false);
      }]
    };

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('boot', {
        url: '/',
        controller: 'BootstrapCtrl',
        resolve: accountResolver
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('app', {
        url: '/app',
        templateUrl: 'views/app.html',
        resolve: accountResolver
      })
      .state('app.user', {
        url: '/:user',
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        resolve: accountResolver
      })
      .state('app.user.playlist', {
        url: '/:playlist',
        templateUrl: 'views/tracks.html',
        controller: 'TracksCtrl',
        resolve: accountResolver
      });

      $sceDelegateProvider.resourceUrlWhitelist([
       'self',
       'https://*.sndcdn.com/**',
       'http://*.soundcloud.com/**'
      ]);

  });

