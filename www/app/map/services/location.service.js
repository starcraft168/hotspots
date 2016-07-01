angular.module('app.LocationFactory', [])

.factory('LocationFactory', ['$cordovaGeolocation', function($cordovaGeolocation) {
  function getCurrentPosition() {
    var options = {
      setTimeout: 10000,
      maximumAge: 60000, //Accept a cached position whose age is no greater than the specified time in milliseconds
      enableHighAccuracy: true
    };
    // console.log('location factory ($cordovaGeolocation.getCurrentPosition(options)', $cordovaGeolocation.getCurrentPosition(options));
    return $cordovaGeolocation.getCurrentPosition(options)
      .then(function(position) {
        return position.coords;
      });
  }

  return {
    getCurrentPosition: getCurrentPosition
  };

}]);
