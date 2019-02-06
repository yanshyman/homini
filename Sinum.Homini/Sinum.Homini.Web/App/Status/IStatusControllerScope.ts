'use strict';

module homini.controllers {
    export interface IStatusControllerScope extends ng.IScope {
        currentTemperature: any;
        isHeating: any;
        lastUpdate: any;
        onOff: string;
        currentBathTemperature:number;
        currentBathHumidity:number;
        lastBathUpdate: any;
        temperatureOutside: number;
        sunrise: any;
        sunset: any;
    }
}