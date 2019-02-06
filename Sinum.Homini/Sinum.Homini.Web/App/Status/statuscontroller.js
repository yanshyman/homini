/// <reference path='../../scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../scripts/typings/jquery/jquery.d.ts' />
/// <reference path="../../scripts/typings/moment/moment.d.ts" />
/// <reference path="../typings.d.ts" />
'use strict';
var homini;
(function (homini) {
    var controllers;
    (function (controllers) {
        var StatusController = (function () {
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
                this.$http.get("https://api.thingspeak.com/channels/346301/feeds.json?api_key=LEAJEWO1097UDGKH&results=50").then(function (response) {
                    if (response) {
                        _this.$scope.currentTemperature = response.data.feeds[0].field1;
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
                this.$http.get("http://api.openweathermap.org/data/2.5/weather?q=Gdynia&appid=3c486328acf637551b0f68c8ca5f90e4").then(function (response) {
                    if (response) {
                        _this.$scope.temperatureOutside = response.data.main.temp - 272.15;
                        _this.$scope.sunrise = moment(response.data.sys.sunrise, "X").format("HH:mm");
                        _this.$scope.sunset = moment(response.data.sys.sunset, "X").format("HH:mm");
                    }
                }, function (error) { });
            };
            StatusController.prototype.switch = function () {
                this.$scope.isHeating = this.$scope.isHeating > 0 ? 0 : 1;
                this.$http.get("http://192.168.0.3/control?cmd=gpio,12," + this.$scope.isHeating);
            };
            return StatusController;
        }());
        StatusController.$inject = ["$scope", '$rootScope', "$http", "$filter", "$route", "$location", "$routeParams", "taskService"];
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
            homini.controllers.StatusController
        ]);
    })(controllers = homini.controllers || (homini.controllers = {}));
})(homini || (homini = {}));
//# sourceMappingURL=statuscontroller.js.map