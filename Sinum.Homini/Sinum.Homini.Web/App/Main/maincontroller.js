/// <reference path='../../scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../scripts/typings/jquery/jquery.d.ts' />
"use strict";
var homini;
(function (homini) {
    var controllers;
    (function (controllers) {
        var MainController = (function () {
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
            return MainController;
        }());
        MainController.$inject = ["$scope", "$rootScope", "$route", "$location", "$http", "$routeParams"];
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
//# sourceMappingURL=maincontroller.js.map