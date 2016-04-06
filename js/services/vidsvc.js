angular.module('myApp').service('vidSvc', function($http, $q){

//video service

this.favoriteUser = {};


  this.getVideos = function(){
    return $http.get('/videos');
  };

   this.addVideos = function(Title, Desc, link, topic){
      var deferred = $q.defer();

      $http.post('/videos', {Title: Title, Desc: Desc, link: link, topic: topic})
      .success(function (data, status){
          if(status === 200 && data.status){
            deferred.resolve();
            console.log(Title, Desc, link, topic);
          }else{
            deferred.reject();
          }
        })
        .error(function (data){
          deferred.reject(data);
        });
        return deferred.promise;

    };
    this.updateUser = function(){
        return $http.put('/user?id=' + this.currentUser._id, this.currentUser)
      };
    this.getFavoriteUser = function() {
        return $http.get('/user/favorite?username=' + this.currentUser.username)
      };
    this.removeFav = function(id) {
        return $http.delete('/user/favorite?username=' + this.currentUser.username)
    };


    this.updateVideos = function(id){
    return $http.put('/videos' + id, update);
    };
    this.deleteVideos = function(id){
        $http({
            method: 'DELETE',
            url: '/videos?id=' + id
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response;
        });
    };
    this.removeFav = function(){
      return $http.delete('/user/favorite?username=' + this.currentUser.username)
      }

})
