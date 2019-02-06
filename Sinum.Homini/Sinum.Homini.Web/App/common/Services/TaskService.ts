/// <reference path='../../../scripts/typings/angularjs/angular.d.ts' />

'use strict';

module homini.services {
    import Task = homini.models.Task;

    export class TaskService {
        constructor(private $http: ng.IHttpService) {
        }

        public getTasks():any{
            this.$http.get("api/task/").then((response: any) => {
                if (response) {
                  return response.data;
                }
            },
                (error) => { });
        }


        public addTask(task: Task): any {
            this.$http.post("api/task/", task)
                .then((response: any) => {
                    return response.data;
                },
                (error) => { });
        }

        public updateTask(task: any) {
            this.$http.put("api/task/", task).then((response: any) => {
                if (response) {
                    return response;
                }
            },
                (error) => { });
        }

        public removeTask(task: Task): any {
            this.$http.delete("api/task/" + task.id).then((response: any) => {
                if (response) {
                    return response;
                }
            },
                (error) => { }
            );
        }


    }

    angular.module('homini.services').service(
        'taskService',
        [
            '$http',
            homini.services.TaskService
        ]);
}
