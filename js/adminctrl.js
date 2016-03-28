angular.module('myApp').controller('adminCtrl', function($scope, membersSvc, vidSvc, $sce){
  //member controller
  $scope.trustSrc = function(src) {
   return $sce.trustAsResourceUrl(src);
 };
  $scope.getVideos = function(){
    vidSvc.getVideos().then(function(response){
      $scope.videos = response.data;
      console.log($scope.videos)
    })
  };
  $scope.getVideos();

    $scope.getVideos = function(id) {
      vidSvc.getVideos(id)
        .then(function(response) {
          $scope.videos = response;
        });
    };

    $scope.newVideos = function(newTitle, newDesc, newlink) {
      vidSvc.newVideo(newTitle, newDesc, newlink)
        .then(function(response) {
          $scope.getVideos();
        });
    };

    $scope.removeVideo = function(id) {
      vidSvc.removeVideo(id)
      .then(function(response){
        alert("Successfully Removed");
        $scope.getVideos();
      });
    };

    $scope.updateVideo = function(videos) {
      var id = videos._id;
      delete videos._id;
      delete videos.__v;
      vidSvc.updateVideo(videos, id)
      .then(function(response){
        $scope.getVideos();
      });
    };

})
