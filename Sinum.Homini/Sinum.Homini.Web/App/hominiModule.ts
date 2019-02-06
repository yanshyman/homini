/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path='../scripts/typings/angularjs/angular-route.d.ts' />
/// <reference path="typings.d.ts" />


module homini {
    export module controllers { }
    export module directives { }

    export module filters { }
    export module services { }
}
var modules = [
    "homini.controllers",
    "homini.filters",
    'homini.services',
    'homini.models',
    'homini.directives',
    "filters","*.json"];

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
angular.module('homini').config(['$routeProvider','$locationProvider',
    ($routeProvider: ng.route.IRouteProvider, $locationProvider) => {
        $routeProvider
            .when('/Homini/Status',
                {
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



angular.module('homini').factory("httpResponseInterceptor", ["$q", "$rootScope", ($q: any, $rootScope: any) => {
    return {
        response(response: any) {
            return response;
        },
        responseError(response: any) {
            if (response.status === 401) {
                $rootScope.$emit("checkauth");
            }
            return $q.reject(response);
        }
    };
}]);

angular.module('homini').config(["$httpProvider", ($httpProvider: any) => {
    $httpProvider.interceptors.push("httpResponseInterceptor");
}]);

