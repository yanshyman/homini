/// <reference path="../../../../scripts/typings/jquery/jquery.d.ts" />

module homini.directives {
    import services = homini.services;
    import Task = homini.models.Task;
    'use strict';

    class EditTask implements ng.IDirective {
        restrict = 'E';
        templateUrl = '/App/common/Directives/EditTask/EditTask.html';
        replace = true;
        scope:any = {
            task: '=',
            confirm: '&',
            cancel:'&'
        };


        constructor(private $rootScope: any, private taskService: services.TaskService) {

        }

        link = (scope: any, el: ng.IAugmentedJQuery, attrs: any) => {
            var taskService = this.taskService;
            document.querySelector('[name="form"]').addEventListener('blur', () => {
              // scope.updateTask(scope.task);
                scope.$apply();

            }, true);

            scope.editTitle = true;
            scope.updateTask = (task: Task) => {
                scope.confirm();
                scope.$apply();

            }
        };

        static factory(): ng.IDirectiveFactory {

            const directive = ($rootScope: any, taskService: any) => new EditTask($rootScope, taskService);
            directive.$inject = ['$rootScope', 'taskService'];
            return (directive) as any;
        }
    }


    angular.module('homini').directive('editTask', EditTask.factory());
}
