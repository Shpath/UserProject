var usersApp = angular.module('usersApp', ['ngRoute', 'ngStorage']);

usersApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/users', {
        templateUrl: '/parts/users.html',
        controller: 'userListController'
    }).when('/users/new', {
        templateUrl: '/parts/newuser.html',
        controller: 'newUserController'
    }).when('/users/:id', {
        templateUrl: '/parts/user.html',
        controller: 'userDetailsController'
    }).when('/users/:id/edit', {
        templateUrl: '/parts/edituser.html',
        controller: 'editUserController'
    }).otherwise({redirectTo: '/users'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })
});

usersApp.directive('confirm', [function ($dialogs) {
    return {
        priority: 100,
        restrict: 'A',
        link: {
            pre: function (scope, element, attrs) {
                var msg = attrs.confirm || "Are you sure?";
                element.bind('click', function (event) {
                    if (!confirm(msg)) {
                        event.stopImmediatePropagation();
                        event.preventDefault;
                    }
                });
            }
        }
    };
}]);
