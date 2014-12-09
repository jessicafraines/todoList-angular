;(function(){
  'use strict';

  angular.module("myToDoApp", ['ngRoute', 'mgcrea.ngStrap']) 
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/tasks.html',
      controller: 'TodoController',
      controllerAs: 'todo'
    })
    .when('/new', {
      templateUrl: 'views/form.html',
      controller: 'TodoController',
      controllerAs: 'todo'
    })
    .when('/:id', {
      templateUrl: 'views/task.html',
      controller: 'ShowController',
      controllerAs: 'show'
    })
    .when('/:id/edit', {
      templateUrl: 'views/form.html',
      controller: 'EditController',
      controllerAs: 'todo'
    })
    .otherwise({redirectTo: '/'});
  })

  .controller('ShowController', function($http, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    $http.get('https://nss-todoapp.firebaseio.com/' + id + '.json')
    .success(function(data){
      vm.task = data;
    })
    .error(function(err){
      alert('Nope');
    });
  })//closes show controller

  .controller('TodoController', function($http, $location){
    var vm = this;
    $http.get('https://nss-todoapp.firebaseio.com/.json')
    .success(function(data){
      vm.tasks = data;
    })
    .error(function(err){
      alert('Not Working Bozo');
    });

    vm.addTask = function(){
      $http.post('https://nss-todoapp.firebaseio.com/.json', vm.newTask)
      .success(function(data){
        vm.tasks[data.name] = vm.newTask;
        vm.newTask = "";
        $location.path('/');
      })
      .error(function(err){
        alert('Wrong Sucka');
      });
    }
    vm.deleteTask = function(id){
      var url = 'https://nss-todoapp.firebaseio.com/' + id + '.json';
      $http.delete(url)
        .success(function(){
          delete vm.tasks[id]
        })
      .error(function(err){
        alert('You may never get rid of me');
      });
    };
  })//closes todo controller

  .controller('EditController', function($http, $routeParams, $location){
    var vm = this;
    var id = $routeParams.id;
    var url = 'https://nss-todoapp.firebaseio.com/' + id + '.json'
    $http.get(url)
    .success(function(data){
      vm.newTask = data;
    })
    .error(function(err){
      alert('Try again Punk');
    })

    vm.addTask = function(){
      $http.put(url, vm.newTask)
      .success(function(data){
        $location.path('/');
      })
      .error(function(err){
        alert('WTF?');
      });
    }
  })//closes edit controller
}());
