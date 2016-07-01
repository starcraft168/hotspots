angular.module('app.CommentsFactory', [])

.factory('CommentsFactory', ['$http','SERVER',function($http, SERVER) {
  var addComment = function(id, comment) {
    return $http({
        method: 'POST',
        url: SERVER.url + '/posts/' + id + '/comments',
        data: {
          id: id,
          comment: comment
        }
      })
      .then(function(response) {
        // console.log('response in addComment POST', response.data);
      });
  };

  return {
    addComment: addComment
  };

}]);
