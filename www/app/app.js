// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
  'ionic',
  'app.routes',
  'ngCordova',
  'app.MapController',
  'app.GoogleMapsService',
  'app.LocationFactory',
  'app.LoadPostsFactory',
  'app.HomeController',
  'app.CommentsFactory',
  'app.CommentsController',
  'app.CameraFactory',
  'app.CameraController'

])

.run(['$rootScope', '$state','$ionicPlatform', function($rootScope, $state, $ionicPlatform) {
      $ionicPlatform.ready(function() {
        $rootScope.$on('$stateChangeStart',function(){
          console.log('----------------------------------')
          $rootScope.stateIsLoading = true;
     });


      $rootScope.$on('$stateChangeSuccess',function(){
          $rootScope.stateIsLoading = false;
     });


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
      navigator.splashscreen.hide();
    }
  });
}])

.constant('SERVER', {
  url: 'https://gentle-spire-1503.herokuapp.com'
  // url: 'http://localhost:3000'
});
