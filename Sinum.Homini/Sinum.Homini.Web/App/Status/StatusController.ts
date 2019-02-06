/// <reference path='../../scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../scripts/typings/jquery/jquery.d.ts' />
/// <reference path="../../scripts/typings/moment/moment.d.ts" />
/// <reference path="../typings.d.ts" />
/// <reference path="../common/services/taskservice.ts" />



'use strict';

module homini.controllers {

    import StatusControllerScope = homini.controllers.IStatusControllerScope;
    export class StatusController {
        static $inject = ["$scope", '$rootScope', "$http", "$filter", "$route", "$location", "$routeParams", "taskService"];
        $onInit() { }
        constructor(
            private $scope: StatusControllerScope,
            private $rootScope: any,
            public $http: ng.IHttpService,
            private $filter: any,
            private $route: any,
            private $location: any,
            private $routeParams: any,
            private taskService: services.TaskService
        ) {

            this.getStatus();
            this.getWheather();
            this.getBathStatus();
        }

        public getConfig() {
            this.$http.get("//api/config").then((response: any) => {
                    if (response) {
                        this.$scope.currentTemperature = response.data.feeds[0].field1;
                        this.$scope.isHeating = response.data.feeds[0].field2;
                        this.$scope.onOff = this.$scope.isHeating > 0 ? "ON" : "OFF";
                        this.$scope.lastUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                    }
                },
                (error) => { });
        }

        public getStatus() {
            this.$http.get("https://api.thingspeak.com/channels/346301/feeds.json?api_key=LEAJEWO1097UDGKH&results=2").then((response: any) => {
                if (response) {
                    console.log(response);
                    this.$scope.currentTemperature = response.data.feeds[1].field1;
                    this.$scope.isHeating = response.data.feeds[0].field2;
                    this.$scope.onOff = this.$scope.isHeating > 0 ? "ON" : "OFF";
                    this.$scope.lastUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                }
            },
                (error) => { });
        }

        public getBathStatus() {
            this.$http.get("https://api.thingspeak.com/channels/349726/feeds.json?api_key=1LOOTP5QJ57P0SE7&results=1").then((response: any) => {
                if (response) {
                    this.$scope.currentBathTemperature = response.data.feeds[0].field1;
                    this.$scope.currentBathHumidity = response.data.feeds[0].field2;
                    this.$scope.lastBathUpdate = moment(response.data.feeds[0].created_at).format("DD-MM-YYYY HH:mm");
                }
            },
                (error) => { });
        }

        public getWheather() {
            this.$http.get("http://api.openweathermap.org/data/2.5/weather?q=Gdynia&appid=3c486328acf637551b0f68c8ca5f90e4&units=metric").then((response: any) => {
                if (response) {

                    this.$scope.temperatureOutside = response.data.main.temp;
                    this.$scope.sunrise = moment(response.data.sys.sunrise, "X").format("HH:mm");
                    this.$scope.sunset = moment(response.data.sys.sunset,"X").format("HH:mm");
                }
            },
                (error) => { });
        }

        public switch() {
            this.$scope.isHeating = this.$scope.isHeating > 0 ? 0 : 1;
            this.$http.get("http://192.168.0.3/control?cmd=gpio,12," + this.$scope.isHeating);
        }
    }

    angular.module('homini').controller(
        "statusController",
        [
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
}