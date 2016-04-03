angular.module('myApp').controller('logoutCtrl', function($scope, $location, authSvc){


  $scope.logout = function(){
    authSvc.logout()
    .then(function (){
      $location.path('/login');
    })
  }
})
