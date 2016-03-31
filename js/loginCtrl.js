angular.module('myApp').controller('loginCtrl', function($scope, $location, adminSvc, vidSvc, authSvc){
  $scope.currentUser = vidSvc.currentUser;


  $scope.login = function(){
    $scope.error = false;
    $scope.disabled = true;

    authSvc.login($scope.loginForm.username, $scope.loginForm.password)
    .then(function(response){
      $location.path('/vids');
      vidSvc.currentUser = response;
      $scope.disabled = false;
      $scope.loginForm = {};
    })

    .catch(function(){
      $scope.error = true;
      $scope.errorMessage = "Fat fingered the password, didn't you";
      $scope.disabled = false;
      $scope.loginForm = {};
    });

  };

})
