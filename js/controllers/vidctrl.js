angular.module('myApp').controller('vidCtrl', function($scope, vidSvc, adminSvc, $sce){
  $scope.favoriteUser = vidSvc.favoriteUser;


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
     $scope.favoriteVideo = function(videos) {
console.log(vidSvc.currentUser)
       for(var i = 0; i < videos.length; i++){
if(videos === vidSvc.currentUser.favorite[i]){
  vidSvc.currentUser.favorite.splice(i, 1);
  vidSvc.updateUser;


} else{
     vidSvc.currentUser.favorite.push(videos);
      vidSvc.updateUser().then(function(response){
        console.log(response)
      });
     };
   };
};
$scope.removeFav = function(id){
  for(var i = 0; i < vidSvc.currentUser.favorite.length; i++){
    console.log(vidSvc.currentUser.favorite[i])
    if(vidSvc.currentUser.favorite[i] === id){
      console.log('1st')
      vidSvc.currentUser.favorite.splice(i, 1);
        vidSvc.updateUser;
  }
}
for(var x = 0; x < vidSvc.favoriteUser.favorite.length; x++){
  if(id === vidSvc.favoriteUser.favorite[x]._id){
    console.log('2nd')
    vidSvc.favoriteUser.favorite.splice(x, 1);
    }
  }
  console.log('hi');
};


   $scope.addComment = function(videos){
  vidSvc.addComment(videos, id).then(function(response){$scope.getVideos();
  });
};

     $scope.getFavoriteUser = function(){
       vidSvc.getFavoriteUser().then(function(response){
         vidSvc.favoriteUser = response.data;
         console.log($scope.favoriteUser);
       })
     }
     $scope.getFavoriteUser();


      $scope.updateVideo = function(videos) {
        var id = videos._id;
        delete videos._id;
        vidSvc.updateVideo(videos, id)
        .then(function(response){
          $scope.getVideos();
        });
      };

  })
angular.module('myApp').directive('scroll', function(){
  $(document).ready(function () {
$(".arrow-right").bind("click", function (event) {
    event.preventDefault();
    $(".vid-list-container").stop().animate({
        scrollLeft: "+=336"
    }, 750);
});
$(".arrow-left").bind("click", function (event) {
    event.preventDefault();
    $(".vid-list-container").stop().animate({
        scrollLeft: "-=336"
    }, 750);
});
});

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
