angular.module('app.CommentsController', [])
  //in order to get the route parameters from the url (e.g, posts/{id}) we need to inject this $stateParams
  .controller('CommentsController', ['$scope', '$stateParams', 'CommentsFactory', 'singlePost', function($scope, $stateParams, CommentsFactory, singlePost) {
    $scope.post = singlePost;
    $scope.comment = { input: ""};
    $scope.addComment = function() {
      if(!$scope.comment.input) {return;}
      CommentsFactory.addComment(singlePost._id, $scope.comment.input)
        .then(function(comment) {
      });

      $scope.post.comments.push($scope.comment.input);
      $scope.comment.input = "";
    };
}]);
