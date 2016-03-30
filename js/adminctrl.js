angular.module('myApp').controller('adminCtrl', function($scope,  vidSvc, authSvc, adminSvc, $sce){
  //member and admin controller


  $scope.videos = function () {


      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call addVideos from service
      vidSvc.addVideos($scope.newvidForm.Title, $scope.newvidForm.Desc, $scope.newvidForm.link)
        // handle success
        .then(function () {
          $scope.disabled = false;
          $scope.newvidForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "What did you do?!?";
          $scope.disabled = false;
          $scope.newvidForm = {};
        });

    };

});
