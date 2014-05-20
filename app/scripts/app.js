'use strict';

angular.module('soundcloudPlayerApp', [
  'ui.router'
])

  .run(function ($rootScope, $state) {

    $rootScope.$on('$stateChangeError',  function(event, toState, toParams, fromState, fromParams, error){
      if (error === 'not connected') {
        $state.go('login', {}, {location: true});
      }
    });

  })
  .config(function($stateProvider, $urlRouterProvider) {

    var accountResolver = {
      account: function (Account) {
        return Account.connect(false);
      }
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
  });

