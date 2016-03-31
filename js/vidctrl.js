angular.module('myApp').controller('vidCtrl', function($scope, vidSvc, adminSvc, $sce){
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

      $scope.newVideos = function(newTitle, newDesc, newlink, newtopic) {
        vidSvc.newVideo(newTitle, newDesc, newlink, newtopic)
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




 //
 //
 //  $scope.trustSrc = function(src) {
 //      return $sce.trustAsResourceUrl(src);
 // };
 //
 //    $scope.getVideos = function(){
 //      vidSvc.getVideos().then(function(response){
 //        vidSvc.videos = response.data;
 //        console.log(vidSvc.videos)
 //    })
 //  };
 //    $scope.getVideos();
 //    $scope.videos = vidSvc.videos;
 //
 //    $scope.getVideos = function(id) {
 //      vidSvc.getVideos(id)
 //        .then(function(response) {
 //          $scope.videos = response;
 //        });
 //    };
 //
 //    $scope.newVideos = function(newTitle, newDesc, newlink, newtopic) {
 //      vidSvc.newVideo(newTitle, newDesc, newlink, newtopic)
 //        .then(function(response) {
 //          $scope.getVideos();
 //        });
 //    };
 //
 //    $scope.removeVideo = function(id) {
 //      vidSvc.removeVideo(id)
 //      .then(function(response){
 //        alert("Successfully Removed");
 //        $scope.getVideos();
 //      });
 //    };
 //
 //    // $scope.updateVideo = function(videos) {
 //      // vidSvc.currentUser.favorite.push(videos);
 //      // vidSvc.updateUser();
 //    // };
 //      $scope.getVideos();
 //
 //    });
