angular.module('myApp').controller('logoutCtrl', function($scope, $location, authSvc){


  $scope.userLogged = authSvc.isLoggedIn();
$scope.$watch($scope.userLogged);

$scope.logout = function () {
  AuthService.logout()
    .then(function () {
      mainService.currentUser = {};
      mainService.userPageUser = {};
      $localStorage.$reset();
      $location.path('login');
    });
    console.log('logout')

};

}]);
