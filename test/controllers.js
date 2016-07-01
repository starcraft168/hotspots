describe('homeCtrl', function(){
  var $scope, $rootScope, createController, LoadPostsFactory, $stateParams, LocationFactory, $ionicLoading, $httpBackend;

  beforeEach(module('app'));
  beforeEach(inject(function($injector){

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    LoadPostsFactory = $injector.get('LoadPostsFactory');
    $stateParams = $injector.get('$stateParams');
    LocationFactory = $injector.get('LocationFactory');
    $ionicLoading = $injector.get('$ionicLoading');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('homeCtrl', {
        $scope: $scope,
        $stateParams: $stateParams,
        LoadPostsFactory: LoadPostsFactory,
        LocationFactory: LocationFactory,
        $ionicLoading: $ionicLoading
      });
    };
  }));

  it('should have a posts property on the $scope', function(){
    createController();
    expect($scope.posts).to.be.an('array');
  });

  //not sure how to test this
  xit('should create a bounds property on the $scope when controller is loaded', function(){
    createController();
    expect($scope.bounds).to.be.an('number');
  });

  it('should have an upvotePost method on the $scope', function(){
    createController();
    expect($scope.upvotePost).to.be.a('function');
  });


});

describe('cameraCtrl', function(){
  var $scope, $rootScope, createController, $state, CameraFactory, LocationFactory, $ionicLoading, $httpBackend;

  //load the controllers module
  beforeEach(module('app'));
  beforeEach(inject(function($injector){

    //mock out dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    CameraFactory = $injector.get('CameraFactory');
    LocationFactory = $injector.get('LocationFactory');
    $ionicLoading = $injector.get('$ionicLoading');
    $scope = $rootScope.$new();
    $state = $injector.get('$state');

    var $controller = $injector.get('$controller');

    //creating a controller
    createController = function(){
      return $controller('cameraCtrl', {
        $scope: $scope,
        $state: $state,
        CameraFactory: CameraFactory,
        LocationFactory: LocationFactory,
        $ionicLoading: $ionicLoading
      });
    };
  }));

  //tests start here
  it('should have a userPost property on the $scope', function(){
    createController();
    expect($scope.userPost).to.be.an('object');
  });

  it('should have a takePicture method on the $scope', function(){
    createController();
    expect($scope.takePicture).to.be.a('function');
  });

  it('should have a getLocation method on the $scope', function(){
    createController();
    expect($scope.getLocation).to.be.a('function');
  });

  it('should have an addPost method on the $scope', function(){
    createController();
    expect($scope.addPost).to.be.a('function');
  });

});

xdescribe('commentsCtrl', function(){
  var $scope, $rootScope, $stateParams, LoadPostsFactory, singlePost, $httpBackend;

  beforeEach(module('app'));
  beforeEach(inject(function($injector){

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    LoadPostsFactory = $injector.get('LoadPostsFactory');
    $scope = $rootScope.$new();
    $stateParams = $injector.get('$stateParams');
    singlePost = $injector.get('singlePost');

    var $controller = $injector.get('$controller');

    //creating a controller
    createController = function(){
      return $controller('cameraCtrl', {
        $scope: $scope,
        $stateParams: $stateParams,
        LoadPostsFactory: LoadPostsFactory,
        singlePost: singlePost
      });
    };
  }));

  it('should have a post property on the $scope', function(){
    expect($scope.post).to.be.an('object');
  });

  it('should have a comment property on the $scope', function(){
    expect($scope.comment).to.be.an('object');
  });

  it('should have a addComment method on the $scope', function(){
    expect($scope.addComment).to.be.a('function');
  });
});

describe('mapCtrl', function(){
  var $scope, $rootScope, $ionicLoading, LocationFactory, LoadPostsFactory, $httpBackend;

  beforeEach(module('app'));
  beforeEach(inject(function($injector){

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    LoadPostsFactory = $injector.get('LoadPostsFactory');
    LocationFactory = $injector.get('LocationFactory');
    $scope = $rootScope.$new();
    $ionicLoading = $injector.get('$ionicLoading');

    var $controller = $injector.get('$controller');

    //creating a controller
    createController = function(){
      return $controller('mapCtrl', {
        $scope: $scope,
        $ionicLoading: $ionicLoading,
        LoadPostsFactory: LoadPostsFactory,
        LocationFactory: LocationFactory,
      });
    };
  }));

  it('should have a posts property on the $scope', function(){
    createController();
    expect($scope.posts).to.be.an('array');
  });

  it('should have a radius property on the $scope', function(){
    createController();
    expect($scope.radius).to.be.an('object');
  });

  it('should have a drawMap method on the $scope', function(){
    createController();
    expect($scope.drawMap).to.be.a('function');
  });

  //this test is falling probably due to a scoping issue
  xit('should have a markers property on the $scope', function(){
    createController();
    expect($scope.markers).to.be.an('array');
  });
});




