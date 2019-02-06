/// <reference path='../../../scripts/typings/angularjs/angular.d.ts' />
'use strict';
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path='../scripts/typings/angularjs/angular-route.d.ts' />
/// <reference path="typings.d.ts" />
var modules = [
    "homini.controllers",
    "homini.filters",
    'homini.services',
    'homini.models',
    'homini.directives',
    "filters", "*.json"
];
for (var idx in modules) {
    if (modules.hasOwnProperty(idx)) {
        angular.module(modules[idx], []);
    }
}
modules.push('ngSanitize');
modules.push('ngRoute');
modules.push('ngResource');
angular.module('homini', modules);
// Url routing
angular.module('homini').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/Homini/Status', {
            templateUrl: '/App/Status/Status.html',
            name: 'statusController'
        })
            .otherwise({
            redirectTo: '/Homini/Status/'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
angular.module('homini').factory("httpResponseInterceptor", ["$q", "$rootScope", function ($q, $rootScope) {
        return {
            response: function (response) {
                return response;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $rootScope.$emit("checkauth");
                }
                return $q.reject(response);
            }
        };
    }]);
angular.module('homini').config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("httpResponseInterceptor");
    }]);
var homini;
(function (homini) {
    var services;
    (function (services) {
        var TaskService = /** @class */ (function () {
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
var homini;
(function (homini) {
    var controllers;
    (function (controllers) {
        var MainController = /** @class */ (function () {
            function MainController($scope, $rootScope, $route, $location, $http, $routeParams) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$route = $route;
                this.$location = $location;
                this.$http = $http;
                this.$routeParams = $routeParams;
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            MainController.prototype.$onInit = function () { };
            MainController.$inject = ["$scope", "$rootScope", "$route", "$location", "$http", "$routeParams"];
            return MainController;
        }());
        controllers.MainController = MainController;
        angular.module('homini').controller("mainController", [
            "$scope",
            "$rootScope",
            "$route",
            "$location",
            "$http",
            "$routeParams",
            homini.controllers.MainController
        ]);
    })(controllers = homini.controllers || (homini.controllers = {}));
})(homini || (homini = {}));
var homini;
(function (homini) {
    var models;
    (function (models) {
        var Task = /** @class */ (function () {
            function Task() {
            }
            return Task;
        }());
        models.Task = Task;
    })(models = homini.models || (homini.models = {}));
})(homini || (homini = {}));
var homini;
(function (homini) {
    var controllers;
    (function (controllers) {
        var StatusController = /** @class */ (function () {
            function StatusController($scope, $rootScope, $http, $filter, $route, $location, $routeParams, taskService) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.$filter = $filter;
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.taskService = taskService;
                this.getStatus();
                this.getWheather();
                this.getBathStatus();
            }
            StatusController.prototype.$onInit = function () { };
            StatusController.prototype.getConfig = function () {
                var _this = this;
                this.$http.get("//api/config").then(function (response) {
                    if (response) {
                        _this.$scope.currentTemperature = response.data.feeds[0].field1;
                        _this.$scope.isHeating = response.data.feeds[0].field2;
                        _this.$scope.onOff = _this.$scope.isHeating > 0 ? "ON" : "OFF";
                        _this.$scope.lastUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                    }
                }, function (error) { });
            };
            StatusController.prototype.getStatus = function () {
                var _this = this;
                this.$http.get("https://api.thingspeak.com/channels/346301/feeds.json?api_key=LEAJEWO1097UDGKH&results=2").then(function (response) {
                    if (response) {
                        console.log(response);
                        _this.$scope.currentTemperature = response.data.feeds[1].field1;
                        _this.$scope.isHeating = response.data.feeds[0].field2;
                        _this.$scope.onOff = _this.$scope.isHeating > 0 ? "ON" : "OFF";
                        _this.$scope.lastUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                    }
                }, function (error) { });
            };
            StatusController.prototype.getBathStatus = function () {
                var _this = this;
                this.$http.get("https://api.thingspeak.com/channels/349726/feeds.json?api_key=1LOOTP5QJ57P0SE7&results=1").then(function (response) {
                    if (response) {
                        _this.$scope.currentBathTemperature = response.data.feeds[0].field1;
                        _this.$scope.currentBathHumidity = response.data.feeds[0].field2;
                        _this.$scope.lastBathUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                    }
                }, function (error) { });
            };
            StatusController.prototype.getWheather = function () {
                var _this = this;
                this.$http.get("http://api.openweathermap.org/data/2.5/weather?q=Gdynia&appid=3c486328acf637551b0f68c8ca5f90e4&units=metric").then(function (response) {
                    if (response) {
                        _this.$scope.temperatureOutside = response.data.main.temp;
                        _this.$scope.sunrise = moment(response.data.sys.sunrise, "X").format("HH:mm");
                        _this.$scope.sunset = moment(response.data.sys.sunset, "X").format("HH:mm");
                    }
                }, function (error) { });
            };
            StatusController.prototype.switch = function () {
                this.$scope.isHeating = this.$scope.isHeating > 0 ? 0 : 1;
                this.$http.get("http://192.168.0.3/control?cmd=gpio,12," + this.$scope.isHeating);
            };
            StatusController.$inject = ["$scope", '$rootScope', "$http", "$filter", "$route", "$location", "$routeParams", "taskService"];
            return StatusController;
        }());
        controllers.StatusController = StatusController;
        angular.module('homini').controller("statusController", [
            "$scope",
            "$rootScope",
            "$http",
            "$filter",
            "$route",
            "$location",
            "$routeParams",
            "taskService",
            StatusController
        ]);
    })(controllers = homini.controllers || (homini.controllers = {}));
})(homini || (homini = {}));
var homini;
(function (homini) {
    var directives;
    (function (directives) {
        angular.module('homini.directives').directive('taskFocus', [
            "$timeout", function ($timeout) {
                return {
                    restrict: 'A',
                    link: function ($scope, element, attributes) {
                        $scope.$watch(attributes.taskFocus, function (newval) {
                            if (newval) {
                                $timeout(function () { return element[0].focus(); }, 0, false);
                            }
                        });
                    }
                };
            }
        ]);
    })(directives = homini.directives || (homini.directives = {}));
})(homini || (homini = {}));
/// <reference path="../../../../scripts/typings/jquery/jquery.d.ts" />
var homini;
(function (homini) {
    var directives;
    (function (directives) {
        'use strict';
        var EditTask = /** @class */ (function () {
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
/// <reference path="hominimodule.ts" />
/// <reference path="common/services/taskservice.ts" />
/// <reference path="main/maincontroller.ts" />
/// <reference path="common/models/task.ts" />
/// <reference path="status/statuscontroller.ts" />
/// <reference path="status/istatuscontrollerscope.ts" />
/// <reference path="directives.ts" />
/// <reference path="common/directives/taskfocus/taskfocus.ts" />
/// <reference path="common/directives/edittask/edittask.ts" />
var homini;
(function (homini) {
    var controllers;
    (function (controllers) {
        var LoginController = /** @class */ (function () {
            function LoginController($scope, $rootScope, $http, $filter, $route, $location, $routeParams, taskService) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.$filter = $filter;
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.taskService = taskService;
                this.getStatus();
                this.getWheather();
                this.getBathStatus();
            }
            LoginController.prototype.$onInit = function () { };
            LoginController.prototype.getConfig = function () {
                var _this = this;
                this.$http.get("//api/config").then(function (response) {
                    if (response) {
                        _this.$scope.currentTemperature = response.data.feeds[0].field1;
                        _this.$scope.isHeating = response.data.feeds[0].field2;
                        _this.$scope.onOff = _this.$scope.isHeating > 0 ? "ON" : "OFF";
                        _this.$scope.lastUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                    }
                }, function (error) { });
            };
            LoginController.prototype.getStatus = function () {
                var _this = this;
                this.$http.get("https://api.thingspeak.com/channels/346301/feeds.json?api_key=LEAJEWO1097UDGKH&results=50").then(function (response) {
                    if (response) {
                        _this.$scope.currentTemperature = response.data.feeds[0].field1;
                        _this.$scope.isHeating = response.data.feeds[0].field2;
                        _this.$scope.onOff = "LOGIN";
                        _this.$scope.lastUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                    }
                }, function (error) { });
            };
            LoginController.prototype.getBathStatus = function () {
                var _this = this;
                this.$http.get("https://api.thingspeak.com/channels/349726/feeds.json?api_key=1LOOTP5QJ57P0SE7&results=1").then(function (response) {
                    if (response) {
                        _this.$scope.currentBathTemperature = response.data.feeds[0].field1;
                        _this.$scope.currentBathHumidity = response.data.feeds[0].field2;
                        _this.$scope.lastBathUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                    }
                }, function (error) { });
            };
            LoginController.prototype.getWheather = function () {
                var _this = this;
                this.$http.get("http://api.openweathermap.org/data/2.5/weather?q=Gdynia&appid=3c486328acf637551b0f68c8ca5f90e4").then(function (response) {
                    if (response) {
                        _this.$scope.temperatureOutside = response.data.main.temp - 272.15;
                        _this.$scope.sunrise = moment(response.data.sys.sunrise, "X").format("HH:mm");
                        _this.$scope.sunset = moment(response.data.sys.sunset, "X").format("HH:mm");
                    }
                }, function (error) { });
            };
            LoginController.prototype.switch = function () {
                this.$scope.isHeating = this.$scope.isHeating > 0 ? 0 : 1;
                this.$http.get("http://192.168.0.3/control?cmd=gpio,12," + this.$scope.isHeating);
            };
            LoginController.$inject = ["$scope", "$rootScope", "$http", "$filter", "$route", "$location", "$routeParams", "taskService"];
            return LoginController;
        }());
        controllers.LoginController = LoginController;
        angular.module('homini').controller("loginController", [
            "$scope", "$rootScope", "$http", "$filter", "$route", "$location", "$routeParams", "taskService",
            homini.controllers.LoginController
        ]);
    })(controllers = homini.controllers || (homini.controllers = {}));
})(homini || (homini = {}));
//# sourceMappingURL=homini.js.map