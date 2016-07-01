angular.module('app.CameraController', [])

.controller('CameraController', ['$scope', '$state', 'CameraFactory', 'LocationFactory', '$ionicLoading', function($scope, $state, CameraFactory, LocationFactory, $ionicLoading) {
  $scope.userPost = {
    upvotes: 0,
    reports: 0,
    comments: [],
    imageURI: undefined,
    caption: '',
    location: {},
    hashtag: ''
  };

  $scope.getLocation = function() {
    LocationFactory.getCurrentPosition()
      .then(function(position) {
        $scope.userPost.location.lng = position.longitude;
        $scope.userPost.location.lat = position.latitude;
      }, function(err) {
        console.log('There was an error: ', err);
      });
  };

  $scope.takePicture = function() {
    CameraFactory.takePhoto()
      .then(function(imageData) {
        $scope.userPost.imageURI = "data:image/jpeg;base64," + imageData;
        $scope.temp = $scope.userPost.imageURI;
      }, function(err) {
        // An error occured. Show a message to the user
        console.log('There was an error: ', err);
        $state.go('main.home'); //this causes a home refresh, which may not be necessary
      });
  };

  $scope.$on('$ionicView.enter', function() {
    $scope.userPost.caption = "";
    $scope.userPost.imageURI = undefined;
    $scope.takePicture();
    $scope.getLocation();
  });


 $scope.addSepiaFilter = function(){
    var image = new Image();
    image.src = $scope.userPost.imageURI;

    var canvas = document.createElement('canvas');
    canvas.height = canvas.width;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    image.style.display = 'none';
    var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i +1] + data[i +2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }

    ctx.putImageData(imageData, 0, 0);
    $scope.userPost.imageURI = canvas.toDataURL();
  };

  $scope.addInvertFilter = function(){
     var image = new Image();
     image.src = $scope.userPost.imageURI;

     var canvas = document.createElement('canvas');
     canvas.height = canvas.width;
     document.body.appendChild(canvas);

     var ctx = canvas.getContext('2d');
     ctx.drawImage(image, 0, 0);
     image.style.display = 'none';
     var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
     var data = imageData.data;

     for (var i = 0; i < data.length; i += 4) {
       data[i]     = 255 - data[i];     // red
       data[i + 1] = 255 - data[i + 1]; // green
       data[i + 2] = 255 - data[i + 2]; // blue
     }

     ctx.putImageData(imageData, 0, 0);
     $scope.userPost.imageURI = canvas.toDataURL();
   };

  $scope.addSaturateFilter = function(){
     var image = new Image();
     image.src = $scope.userPost.imageURI;

     var canvas = document.createElement('canvas');
     canvas.height = canvas.width;
     document.body.appendChild(canvas);

     var ctx = canvas.getContext('2d');
     ctx.drawImage(image, 0, 0);
     image.style.display = 'none';
     var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
     var data = imageData.data;

     for (var i = 0; i < data.length; i += 4) {
       data[i]     = 235 - data[i];     // red
       data[i + 1] = 126 - data[i + 1]; // green
       data[i + 2] = 126 - data[i + 2]; // blue
     }

     ctx.putImageData(imageData, 0, 0);
     $scope.userPost.imageURI = canvas.toDataURL();
   };

   $scope.clearFilter = function(){
     var image = new Image();
     image.src = $scope.temp;

     var canvas = document.createElement('canvas');
     canvas.height = canvas.width;
     document.body.appendChild(canvas);

     var ctx = canvas.getContext('2d');
     ctx.drawImage(image, 0, 0);
     image.style.display = 'none';
     var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
     var data = imageData.data;

     ctx.putImageData(imageData, 0, 0);
     $scope.userPost.imageURI = canvas.toDataURL();
   };

  $scope.addPost = function() {
    var hashtags = [];
    var postCaptionWords = $scope.userPost.caption.split(" ");
    var getHashtags = function(wordsArray) {
      for(var i = 0; i < wordsArray.length; i++) {
        if(wordsArray[i][0] === '#') {
          hashtags.push(wordsArray[i]);
          $scope.userPost.hashtag = hashtags.join(" ");
        }
      }
    };

    $ionicLoading.show({
      template: 'Posting your photo, please-wait...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    CameraFactory.postPhoto($scope.userPost)
      .success(function() {
        $state.go('main.home');
      })
      .catch(function(err) {
        console.log('There was an error: ', err);
      });
  };

}]);
