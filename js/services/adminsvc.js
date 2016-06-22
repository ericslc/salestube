angular.module('myApp').service('adminSvc', function($http, $q){
  //user service
this.currentUser =  $localStorage.currentUser;


this.getComment = function(id){
  return $http.get('/comments');
};
this.addComment = function(comment, link, site){
  var deferred = $q.defer();

  $http.post('/comments', {comment:comment, link:link, site:site})
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
