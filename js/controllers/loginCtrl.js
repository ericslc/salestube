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
      vidSvc.getFavoriteUser();


    })

    .catch(function(){
      $scope.error = true;
      $scope.errorMessage = "Password doesn't match";
      $scope.disabled = false;
      $scope.loginForm = {};
    });

  };

})
