angular.module('app.MapController', [])

.controller('MapController', ['$scope', 'LoadPostsFactory', 'googleMapFactory',function($scope, LoadPostsFactory, googleMapFactory) {
  $scope.radius = googleMapFactory.circleRadius;

}]);
