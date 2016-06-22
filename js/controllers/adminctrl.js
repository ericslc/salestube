angular.module('myApp').controller('adminCtrl', function($scope,  vidSvc, authSvc, adminSvc,  $sce){
  //comments/messages and admin controller
  $scope.currentUser = vidSvc.currentUser;
  $scope.newcommentForm = {};


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
          $scope.errorMessage = "Not as expected?";
          $scope.disabled = false;
          $scope.newvidForm = {};
        });

    };


    // beginning of comments section


    $scope.newishcomment = function () {
      //initial form values
      $scope.error = false;
      $scope.disabled = true;

      // call addComment from service
      console.log($scope.newcommentForm)
      adminSvc.addComment($scope.newcommentForm.comment, $scope.newcommentForm.link, $scope.newcommentForm.site)

        .then(function () {
          $scope.disabled = false;
          $scope.newcommentForm = {};
        })

        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.newcommentForm = {};
        });

      };



    $scope.getComment = function(){
      adminSvc.getComment().then(function(response){
        $scope.comment = response.data;
        console.log($scope.comment)
    })
  };
    $scope.getComment();


    $scope.newComment = function(newcomment, newlink, newsite){
      adminSvc.newComment(newcomment, newlink, newsite).then(function(response){
        $scope.getComment();

      })
    };


    $scope.toggle = function(){
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
