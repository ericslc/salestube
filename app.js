angular.module('myApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/home',
    controller: 'loginCtrl',
    templateUrl: '/views/home.html',
    access: {restricted: false}
})

  .state('login', {
    url: '/login',
    controller: 'loginCtrl',
    templateUrl: '/views/login.html',
    access: {restricted: false}

  })
  .state('signup', {
    url: '/signup',
    controller : 'signupCtrl',
    templateUrl: '/views/signup.html',
    access: {restricted: false}
  })
  .state('vids', {
    url: '/vids',
    controller: 'vidCtrl',
    templateUrl: '/views/vids.html',
    access: {restricted: true},
    resolve: {
      security: ['$q', 'authSvc', function($q, authSvc){
        if(authSvc.currentUser === null){
          return $q.reject('Not Authorized');
        }

      }]
    }
  })
  .state('members', {
    url: '/members',
    controller: 'adminCtrl',
    templateUrl: '/views/members.html',
     access: {restricted: true},
     resolve: {
       security: ['$q', 'authSvc', function($q, authSvc){
         if(authSvc.currentUser === null){
           return $q.reject('Not Authorized');
         }

       }]
     }

  })
  .state('admin', {
    url: '/admin',
    controller: 'adminCtrl',
    templateUrl: '/views/admin.html',
     access: {restricted: true},
     resolve: {
       security: ['$q', 'authSvc', function($q, authSvc){
         if(authSvc.currentUser === null){
           return $q.reject('Not Authorized');
         }

       }]
     }

  });

  $urlRouterProvider.otherwise('/home');


  });
  angular.module('myApp').run(function ($state, $rootScope, $location, authSvc) {
   $rootScope.$on('$stateChangeStart',
     function (event, next, current) {
       authSvc.getUserStatus();
       if (next.access.restricted &&
           !authSvc.isLoggedIn()) {
             event.preventDefault();
             $state.go('login')
       }
   });
  });
