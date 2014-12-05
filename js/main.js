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
          priority: 'high'
        },
        {
          name: 'Do laundry',
          desc: 'Wash diapers and clothes',
          due: 'Sunday',
          priority: 'high'
        },
        {
          name: 'Return presents',
          desc: 'Surf and Ski shop',
          due: 'Saturday',
          priority: 'high'
        }
      ];
      vm.priorityOptions = 
      {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      };
        
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
