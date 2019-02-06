/// <reference path='../../scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../scripts/typings/jquery/jquery.d.ts' />

"use strict";

module homini.controllers {
    import Task = homini.models.Task;
    import MainControllerScope = homini.controllers.IMainControllerScope;
    export class MainController {
        static $inject = ["$scope", "$rootScope", "$route", "$location", "$http","$routeParams"];
        $onInit() { }
        constructor(private $scope: MainControllerScope,
            private $rootScope: any,
            private $route: any,
            private $location: any,
            public $http: ng.IHttpService,
            public $routeParams: any

        ) {
            this.$route = $route;
            this.$location = $location;
            this.$routeParams = $routeParams;
          

        }
    }

    angular.module('homini').controller("mainController", [
        "$scope",
        "$rootScope",
        "$route",
        "$location",
        "$http",
        "$routeParams",
        homini.controllers.MainController]);
}