angular.module('myApp').controller('adminCtrl', function($scope,  vidSvc, authSvc, adminSvc, vidSvc, $sce){
  //member and admin controller
  $scope.currentUser = vidSvc.currentUser;


  $scope.videos = function () {


      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call addVideos from service
      vidSvc.addVideos($scope.newvidForm.Title, $scope.newvidForm.Desc, $scope.newvidForm.link, $scope.newvidForm.topic)
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
    $scope.getComment = function(){
      adminSvc.getComment().then(function(response){
        $scope.comment = response.data;
        console.log($scope.comment)
    })
  };
    $scope.getComment();

    
    $scope.newComment = function(newcomment, newlink){
      adminSvc.newComment(newcomment, newlink).then(function(response){
        $scope.getComment();

      })
    }


    $scope.toggle=function(){
    $scope.showing = !$scope.showing;
  };
  $scope.showing = false;
});
angular.module('myApp').directive('hideForm', function(){
  function link ($scope, element, attributes){
      var expression = attributes.hideForm;
      if ( ! $scope.$eval( expression)){
        element.hide();
      }
    $scope.$watch(expression, function(newValue, oldValue){
      if (newValue === oldValue) {
        return;
      } if ( newValue){
        element.stop(true, true).slideDown();
      }else{
        element.stop(true, true).slideUp();
      }

    });
  };
    return ({
      link:link,
      restrict: 'A'

    });
})
