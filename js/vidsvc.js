angular.module('myApp').service('vidSvc', function($http){

//video service
  this.getVideos = function(){
    return $http.get('/api/videos');
  };
  this.addVideos = function(){
    return $http.post('/api/videos', videos);
  };
  this.updateVideos = function(id){
    return $http.put('/api/videos' + id, update);
  };
  this.deleteVideos = function(id){
    return $http.delete('/api/videos?id=' + id);
  }
})
