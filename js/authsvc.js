angular.module('myApp').factory('authSvc',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;


    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      signup: signup
    });

    //determine if logged in
    function isLoggedIn(){
      if(user) {
        return true;
      }else{
        return false;
      }
    }

    function getUserStatus(){
      $http.get('/user/status')
      .success(function(data){
        if(data.status){
          user = true;
        }else{
          user = false;
        }
      })
      .error(function (data){
        user = false;
      });
    }

    //whether successful or not
    function login(username, password) {
     var deferred = $q.defer();
     $http.post('/user/login',
       {username: username, password: password})
       .success(function (data, status) {
         if(status === 200 && data.status){
           user = true;
           this.currentUser = data.user;
           console.log(this.currentUser);
           deferred.resolve(this.currentUser);
         } else {
           user = false;
           deferred.reject();
         }
       })
       .error(function (data) {
         user = false;
         deferred.reject();
       });
     return deferred.promise;
   }
    /*function login(username, password){
      var deferred = $q.defer();
      $http.post('/user/login', {username: username, password: password})
      .success(function(data, status){
        if(status === 200 && data.status){
          user = true;
          deferred.resolve();
        }else{
          user = false;
          deferred.reject();
        }
      })
      .error(function(data){
        user = false;
        deferred.reject();
      });

      return deferred.promise;

    }*/
    function logout() {
      var deferred = $q.defer();

      $http.get('/user/logout')
      .success(function(data){
        user = false;
        deferred.reject();
      });
      return deferred.promise;
    }

    // sign up
    function signup(username, password){
      var deferred = $q.defer();

      $http.post('/user/signup', {username: username, password: password})
      .success(function (data, status){
        if(status === 200 && data.status){
          deferred.resolve();
          console.log(username, password);
        }else{
          deferred.reject();
        }
      })
      .error(function (data){
        deferred.reject(data);
      });
      return deferred.promise;

    }
    }]);
