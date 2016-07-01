angular.module('app.LoadPostsFactory', [])

.factory('LoadPostsFactory', ['$http', 'LocationFactory', 'SERVER', function($http, LocationFactory, SERVER) {
  var posts = { posts: []};
  var lastPostsId; //get the last ID of the post
  var dbPostCount;

  //get postCount for to tell infinite scroll when to stop
  var getDBPostCount = function() {
    // console.log('should only be called once!');
    return $http({
        method: 'GET',
        url: SERVER.url + '/postscount'
      })
      .then(function(response) {
        dbPostCount = response.data;// console.log('dbPostCount -->', dbPostCount);
      });
  };


  var getPosts = function() {
    return $http({
        method: 'GET',
        url: SERVER.url + '/posts'
      })
      .then(function(response) {
        console.log('inital result', posts.posts);

        angular.copy(response.data, posts.posts); // (src, dest)
        lastPostsId = response.data[response.data.length - 1]._id;
        // console.log('last post -->', response.data[response.data.length - 1], 'lastPostsId', lastPostsId);
        console.log('final result', posts.posts);
        dbPostCount = dbPostCount - response.data.length;
        // console.log('dbPostCount initial load -->', dbPostCount);
      });
  };

  //grabs all posts
  var getAllPosts = function() {
    return $http({
      method: 'GET',
      url: SERVER.url +'/posts'
    })
    .then(function(response) {
      var arr = response.data.sort(function(a,b) {
        return b.upvotes - a.upvotes;
      });
      angular.copy(arr, posts.posts);
      console.log('good',response.data);
    });
  };


  //Fetch more posts if user hits bottom of newsfeed
  var loadMorePosts = function() {
    return $http({
        method: 'GET',
        url: SERVER.url + '/nextposts',
        params: {
          id: lastPostsId
        }
      })
      .then(function(response) {
        posts.posts = posts.posts.concat(angular.copy(response.data));
        dbPostCount = dbPostCount - response.data.length;
        // console.log('dbPostCount after load more -->', dbPostCount);
        lastPostsId = posts.posts[posts.posts.length - 1]._id;
        // console.log('new last post', lastPostsId);
        // console.log('posts inside service ---------------', posts);
        return {
          posts: posts,
          postsLeft: dbPostCount
        };
      });
  };




  //Fetch a single post - used when click on comments for a post
  var getSinglePost = function(id) {
    return $http({
        method: 'GET',
        url: SERVER.url + '/posts/' + id
      })
      .then(function(response) {
        return response.data;
      });
  };


  var addComment = function(id, comment) {
    return $http({
        method: 'POST',
        url: SERVER.url + '/posts/' + id + '/comments',
        data: { id: id, comment: comment }
      })
      .then(function(response) {
        // console.log('response in addComment POST', response.data);
      });
  };


  var upvotePost = function(id) {
    return $http({
        method: 'PUT',
        url: SERVER.url + '/posts/' + id + '/upvote',
        data: { id: id }
      })
      .then(function(response) {
        console.log('response in upvotePost PUT', response.data);
      });
  };

 var downvotePost = function(id) {
    return $http({
      method: 'PUT',
      url: SERVER.url + '/posts/' + id + '/downvote',
      data: {
        id: id
      }
    })
    .then(function(response) {
       // console.log('response in downvotePost', response.data);
     });
  };

  var reportPost = function(id) {
    return $http({
      method: 'PUT',
      url: SERVER.url + '/posts/' + id + '/report',
      data: {
        id: id
      }
    });
  };

  var removePost = function(id) {
    return $http({
      method: 'DELETE',
      url: SERVER.url + '/posts/' + id + '/removePost',
      // params: {
      //   id: id
      // }
    })
      .then(function(response){
        console.log('this is the response object: ', response);
      }, function(error){
        console.log('There was an error', error);
      });
  };

  return {
    posts: posts,
    getDBPostCount: getDBPostCount,
    getPosts: getPosts,
    getSinglePost: getSinglePost,
    loadMorePosts: loadMorePosts,
    upvotePost: upvotePost,
    downvotePost: downvotePost,
    getAllPosts: getAllPosts,
    removePost: removePost,
    reportPost: reportPost

  };
}]);
