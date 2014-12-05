;(function(){
  'use strict';

  angular.module("myToDoApp", []) //what are these square brackets for?
    .controller('TodoController', function(){
      var vm = this;
      vm.tasks = [
        {
          name: 'Clean house',
          desc: 'Vacuum and dust',
          due: 'Sunday',
          priority: 'test'
        },
        {
          name: 'Do laundry',
          desc: 'Wash diapers and clothes',
          due: 'Sunday',
          priority: 'test'
        },
        {
          name: 'Return presents',
          desc: 'Surf and Ski shop',
          due: 'Saturday',
          priority: 'test'
        }
      ];
        vm.addTask = function(){
          vm.tasks.push(vm.newTask);
          vm.newTask = null;
        };
        vm.deleteTask = function(task){
          var index = vm.tasks.indexOf(task);
          vm.tasks.splice(index, 1);
        
        };
    });
}());
