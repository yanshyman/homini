/// <reference path="../../../../scripts/typings/jquery/jquery.d.ts" />


'use strict';

module homini.directives {
    angular.module('homini.directives').directive(
        'taskFocus',
        [
            "$timeout", ($timeout: ng.ITimeoutService) => {
                return {
                    restrict: 'A',
                    link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
                        $scope.$watch(attributes.taskFocus,
                            newval => {
                                if (newval) {
                                    $timeout(() => element[0].focus(), 0, false);
                                }
                            });
                    }
            };
}]);
}