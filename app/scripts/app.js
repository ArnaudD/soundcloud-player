'use strict';

angular.module('soundcloudPlayerApp', [
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('boot', {
      url: '/',
      controller: 'BootstrapCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('app', {
      url: '/app',
      templateUrl: 'views/app.html',
    })
    .state('app.user', {
      url: '/:user',
      templateUrl: 'views/user.html',
      controller: 'UserCtrl'
    })
    .state('app.user.playlist', {
      url: '/:playlist',
      templateUrl: 'views/tracks.html',
      controller: 'TracksCtrl'
    });

});

