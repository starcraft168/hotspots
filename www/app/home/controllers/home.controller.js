angular.module('app.HomeController', [])

.controller('HomeController', ['$scope', 'LoadPostsFactory', '$stateParams', 'LocationFactory', '$ionicLoading', '$ionicActionSheet', '$ionicPopup', function($scope, LoadPostsFactory, $stateParams, LocationFactory, $ionicLoading, $ionicActionSheet, $ionicPopup) {
  $scope.posts = LoadPostsFactory.posts;

  //
  $scope.$on('$ionicView.enter', function() {
    $ionicLoading.hide();
  });

  $scope.search = {input: ""}
  $scope.searchCanel = function(){
    $scope.search.input = "";
  }

  $scope.upvotePost = function(post) {
    if(sessionStorage[post._id] !== undefined) {
      $scope.upVoteActive = true;
      LoadPostsFactory.downvotePost(post._id);
      post.upvotes--;
      delete sessionStorage[post._id];
    } else {
      LoadPostsFactory.upvotePost(post._id);
      post.upvotes++;
      sessionStorage[post._id] = true;
    }
  };


  //show trending images
  $scope.showTrending = function() {
    LoadPostsFactory.getAllPosts();
    $scope.bounds = 10000000;
  };

  $scope.report = function(post) {
    $scope.reportActive = true;
    if(post.reports === 99){
      LoadPostsFactory.removePost(post._id)
        .then(function(){
          $ionicPopup.alert({
            title: 'Thank You!',
            template: 'We apologize if this post affected your experience in a negative way. It has been removed, thank you!'
          }).then(function(){
            $ionicLoading.show();
            LoadPostsFactory.getPosts().then(function(){
              $ionicLoading.hide();
            });
          });
        });
    } else if(sessionStorage[post._id + 'Reported'] !== undefined){
          $ionicPopup.alert({
            title: 'Already Reported',
            template: 'You have already reported this post. We will work diligently to handle the issue, thank you!'
          });
    } else {
      LoadPostsFactory.reportPost(post._id)
        .then(function(){
          $ionicPopup.alert({
            title: 'Reported',
            template: 'Thank you for reporting this malicious content'
          });
          sessionStorage[post._id + 'Reported'] = true;
        });
      post.reports++;
    }
  };

  //pull to refresh
  $scope.doRefresh = function() {
    LoadPostsFactory.getPosts().then(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.moreDataCanBeLoaded = true;
  $scope.loadMorePosts = function() {
    // console.log('calling loadMorePosts----------');
    LoadPostsFactory.loadMorePosts().then(function(response) {
      // console.log('response from loaf more', response);
      $scope.posts = response.posts;
      $scope.moreDataCanBeLoaded = response.postsLeft;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
}]);
