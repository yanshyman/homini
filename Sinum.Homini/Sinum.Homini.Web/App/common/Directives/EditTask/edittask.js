/// <reference path="../../../../scripts/typings/jquery/jquery.d.ts" />
var homini;
(function (homini) {
    var directives;
    (function (directives) {
        'use strict';
        var EditTask = (function () {
            function EditTask($rootScope, taskService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.taskService = taskService;
                this.restrict = 'E';
                this.templateUrl = '/App/common/Directives/EditTask/EditTask.html';
                this.replace = true;
                this.scope = {
                    task: '=',
                    confirm: '&',
                    cancel: '&'
                };
                this.link = function (scope, el, attrs) {
                    var taskService = _this.taskService;
                    document.querySelector('[name="form"]').addEventListener('blur', function () {
                        // scope.updateTask(scope.task);
                        scope.$apply();
                    }, true);
                    scope.editTitle = true;
                    scope.updateTask = function (task) {
                        scope.confirm();
                        scope.$apply();
                    };
                };
            }
            EditTask.factory = function () {
                var directive = function ($rootScope, taskService) { return new EditTask($rootScope, taskService); };
                directive.$inject = ['$rootScope', 'taskService'];
                return (directive);
            };
            return EditTask;
        }());
        angular.module('homini').directive('editTask', EditTask.factory());
    })(directives = homini.directives || (homini.directives = {}));
})(homini || (homini = {}));
//# sourceMappingURL=edittask.js.map