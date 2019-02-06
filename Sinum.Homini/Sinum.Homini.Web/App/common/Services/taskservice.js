/// <reference path='../../../scripts/typings/angularjs/angular.d.ts' />
'use strict';
var homini;
(function (homini) {
    var services;
    (function (services) {
        var TaskService = (function () {
            function TaskService($http) {
                this.$http = $http;
            }
            TaskService.prototype.getTasks = function () {
                this.$http.get("api/task/").then(function (response) {
                    if (response) {
                        return response.data;
                    }
                }, function (error) { });
            };
            TaskService.prototype.addTask = function (task) {
                this.$http.post("api/task/", task)
                    .then(function (response) {
                    return response.data;
                }, function (error) { });
            };
            TaskService.prototype.updateTask = function (task) {
                this.$http.put("api/task/", task).then(function (response) {
                    if (response) {
                        return response;
                    }
                }, function (error) { });
            };
            TaskService.prototype.removeTask = function (task) {
                this.$http.delete("api/task/" + task.id).then(function (response) {
                    if (response) {
                        return response;
                    }
                }, function (error) { });
            };
            return TaskService;
        }());
        services.TaskService = TaskService;
        angular.module('homini.services').service('taskService', [
            '$http',
            homini.services.TaskService
        ]);
    })(services = homini.services || (homini.services = {}));
})(homini || (homini = {}));
//# sourceMappingURL=taskservice.js.map