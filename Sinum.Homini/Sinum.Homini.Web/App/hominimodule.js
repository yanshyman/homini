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
angular.module('homini').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/Status', {
            name: 'Status',
            templateUrl: '/App/Status/Status.html'
        })
            .otherwise({
            redirectTo: '/Status'
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
//# sourceMappingURL=hominimodule.js.map