;(function(){
  'use strict';

  angular.module("myToDoApp", ['ngRoute']) 
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
        controller: 'TodoController',
        controllerAs: 'todo'
      })
      .otherwise: ({redirectsTo: '/'});
    })
    .controller('TodoController', function($http){
      var vm = this;
        
        vm.addTask = function(){
          vm.tasks.push(vm.newTask);
          vm.newTask = _freshTask();
        };
        vm.deleteTask = function(task){
          var index = vm.tasks.indexOf(task);
          vm.tasks.splice(index, 1);
        };

        vm.newTask = _freshTask();
        
        function _freshTask(){
          return {
            priority: 'medium'
          }
        }
    });
}());
