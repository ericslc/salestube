angular.module('myApp').controller('loginCtrl', function($scope, $location, adminSvc, authSvc){
  $scope.currentUser = adminSvc.currentUser;


  $scope.login = function(){
    $scope.error = false;
    $scope.disabled = true;

    authSvc.login($scope.loginForm.username, $scope.loginForm.password)
    .then(function(response){
      $location.path('/vids');
      adminSvc.currentUser = response;
      $scope.disabled = false;
      $scope.loginForm = {};
    })

    .catch(function(){
      $scope.error = true;
      $scope.errorMessage = "its because this didn't work";
      $scope.disabled = false;
      $scope.loginForm = {};
    });

  };

})
