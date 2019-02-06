/// <reference path="../../../../scripts/typings/jquery/jquery.d.ts" />
'use strict';
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
//# sourceMappingURL=taskfocus.js.map