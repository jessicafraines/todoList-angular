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

    .factory('todoFactory', function($http, $location){

      function getTodo(id, cb){
        var url = 'https://nss-todoapp.firebaseio.com/' + id + '.json'
        $http.get(url)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          alert('Nope');
        });
      }
      function editTodo(id, task){
        var url = 'https://nss-todoapp.firebaseio.com/' + id + '.json'
        $http.put(url, task)
          .success(function(data){
            $location.path('/');
          })
          .error(function(err){
            alert('WTF?');
          });
        }
      function getAllTodos(cb){
        $http.get('https://nss-todoapp.firebaseio.com/.json')
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          alert('Not Working Bozo');
        });
      }
      function createTodo(task, cb){  
        $http.post('https://nss-todoapp.firebaseio.com/.json', task)
          .success(function(data){
            cb(data);
            $location.path('/');
          })
          .error(function(err){
            alert('Wrong Sucka');
          });
        }
      function deleteTodo(id, cb) {
        var url = 'https://nss-todoapp.firebaseio.com/' + id + '.json';
        $http.delete(url)
          .success(function(){
            cb();
          })
        .error(function(err){
          alert('You may never get rid of me');
        });
      };
      var priorityOptions = {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      };

      return{
        getTodo: getTodo,
        editTodo: editTodo,
        getAllTodos: getAllTodos,
        createTodo: createTodo,
        deleteTodo: deleteTodo,
        priorityOptions: priorityOptions
      };
    })

  .controller('ShowController', function($routeParams, todoFactory){
    var vm = this;
    var id = $routeParams.id;
    todoFactory.getTodo(id, function(data){
      vm.task = data;
    });
  })//closes show controller

  .controller('EditController', function($routeParams, todoFactory){
    var vm = this;
    var id = $routeParams.id;
    todoFactory.getTodo(id, function(data){
      vm.newTask = data;
    });
    vm.addTask = function(){
      todoFactory.editTodo(id, vm.newTask);
    };
    vm.priorityOptions = todoFactory.priorityOptions;
  })//closes edit controller

  .controller('TodoController', function(todoFactory){
    var vm = this;
    
    todoFactory.getAllTodos(function(data){
      vm.tasks = data;
    });

    vm.addTask = function(){
      todoFactory.createTodo(vm.newTask, function(data){
        vm.tasks[data.name] = vm.newTask;
      });
    };

    vm.deleteTask = function(id){
      todoFactory.deleteTodo(id, function(){
        delete vm.tasks[id];
      })
    };

    vm.priorityOptions = todoFactory.priorityOptions;

  })//closes todo controller

}());
