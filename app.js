angular.module('myApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/home',
    controller: 'loginCtrl',
    templateUrl: '/views/home.html'
  })

  .state('login', {
    url: '/login',
    controller: 'loginCtrl',
    templateUrl: '/views/login.html'
  })
  .state('signup', {
    url: '/signup',
    controller : 'loginCtrl',
    templateUrl: '/views/signup.html'
    })
  .state('vids', {
    url: '/vids',
    controller: 'vidCtrl',
    templateUrl: '/views/vids.html'
  })
  .state('members', {
    url: '/members',
    controller: 'adminCtrl',
    templateUrl: '/views/members.html'
  })
  .state('admin', {
    url: '/admin',
    controller: 'adminCtrl',
    templateUrl: '/views/admin.html'
  })

  $urlRouterProvider.otherwise('/home');




})
