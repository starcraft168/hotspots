angular.module('app.GoogleMapsService', [])

.factory('googleMapFactory', function(LocationFactory, LoadPostsFactory) {
  var posts = LoadPostsFactory.posts;
  var circleRadius = { min: "1609.34", max: "80467.2", value: "40233.6"};
  var circleBounds;


  createGoogleMap();

  function createGoogleMap() {
    //if I recieved this initially I wouldn't need this then!!!!!
    LocationFactory.getCurrentPosition()
      .then(function(coordinates) {
        var myLatLng = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          disableDoubleClickZoom: false,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });


        var circle = new google.maps.Circle({
          strokeColor: '#00BBD7',
          strokeWeight: 3,
          fillColor: '#00BBD7',
          fillOpacity: 0.35,
          map: map, //changed map -$scope
          center: myLatLng,
          radius: parseInt(circleRadius.value, 10), // THIS IS IN METERS radius.value - $scope {min: "1209.34", max: "40467.2", value: "20233.6"}
          draggable: true
        });

        var circleBounds = circle.getBounds();


        ////////////////////////////////////// Map Markers //////////////////////////////////////////////////

        var markers = {
          markers: []
        };
        var infoWindow = new google.maps.InfoWindow();
        posts.posts.forEach(function(post) {
          console.log('post', post);
          var aPost = new google.maps.LatLng(post.location.lat, post.location.lng);

          console.log('are any inside?', circleBounds.contains(aPost));
          if (circleBounds.contains(aPost)) {
            createMarker(post);
          }
        });
        console.log('scope.markers after push', markers.markers);


        function createMarker(post) {
          var marker = new google.maps.Marker({
            position: post.location,
            map: map,
            animation: google.maps.Animation.DROP,
            title: post.caption
          });
          marker.content = '<img src=' + post.imageURI + '>';
          marker.addListener('click', function() {
            console.log('marker content is?', marker.content )
            infoWindow.setContent('<center><h6 style="margin-top:0; font-weight:800">' + marker.title + '</h6>' + marker.content + '</center>');
            infoWindow.open(map, marker);
          });
          markers.markers.push(marker);
        }

        /*----------------------EVENT LISTENERS FOR MAP--------------------------------------------------------------*/

        //LISTEN FOR USER DRAGGING CIRCLE AROUND MAP
        google.maps.event.addListener(circle, 'dragend', function() {
          myLatLng = new google.maps.LatLng(circle.getCenter().lat(), circle.getCenter().lng());
          circleBounds = circle.getBounds();

          //removes markers from map
          //at this point in time the markers array if filled with markers or posts, as we're inside the click handler
          console.log('scope.markers --->', markers.markers);
          markers.markers.forEach(function(marker) {
            console.log('marker inside markers.forEach');
            marker.setMap(null); // set individual marker to null.. in this case all
          });
          //create new markers array
          markers.markers = [];

          //adds new markers based on circle radius
          posts.posts.forEach(function(post) {
            var aPost = new google.maps.LatLng(post.location.lat, post.location.lng);
            console.log('post in slider', post);
            if (circleBounds.contains(aPost)) {
              createMarker(post);
            }
          });
        });

        //SLIDER EVENT LISTNER
        google.maps.event.addDomListener(document.getElementById("radius"), 'drag', function() {
          console.log('slider dragged...radius is:', circleRadius);
          var radius = parseInt(circleRadius.value, 10);
          console.log('radius after change & parse', radius); //radius.value - $scope
          circle.setRadius(radius); //set new radius
          circleBounds = circle.getBounds();

          //removes markers from map
          //at this point in time the markers array if filled with markers or posts, as we're inside the click handler
          markers.markers.forEach(function(marker) {
            console.log('marker inside markers.forEach');
            marker.setMap(null); // set individual marker to null.. in this case all
          });
          //create new markers array
          markers.markers = [];

          //adds new markers based on circle radius
          posts.posts.forEach(function(post) {
            var aPost = new google.maps.LatLng(post.location.lat, post.location.lng);
            console.log('post in slider', post);
            if (circleBounds.contains(aPost)) {
              createMarker(post);
            }
          });
        });
      });
  } //end of create Map

  return {
    circleRadius: circleRadius
  };
})
