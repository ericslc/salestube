angular.module('myApp').service('adminSvc', function($http){
  //user service
this.currentUser = {};


this.getComment = function(id){
  return $http.get('/comments');
};
this.newComment = function(comment, link){
  var deferred = $q.defer();

  $http.post('/comments', {comment:comment, link:link})
  .success(function (data, status){
      if(status === 200 && data.status){
        deferred.resolve();
      }else{
        deferred.reject();
      }
    })
    .error(function (data){
      deferred.reject(data);
    });
    return deferred.promise;
};
this.deleteComment = function(id){
  $http({
      method: 'DELETE',
      url: '/comments?id=' + id
  }).then(function successCallback(response) {
      return response;
  }, function errorCallback(response) {
      return response;
  });
};
});
