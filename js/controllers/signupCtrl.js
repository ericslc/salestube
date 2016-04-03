angular.module('myApp').controller('signupCtrl', function ($scope, $location, authSvc) {

    $scope.signup = function () {


        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call register from service
        authSvc.signup($scope.signupForm.username, $scope.signupForm.password)
          // handle success
          .then(function () {
            $location.path('/login');
            $scope.disabled = false;
            $scope.signupForm = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "What did you do?!?";
            $scope.disabled = false;
            $scope.signupForm = {};
          });

      };

  });
