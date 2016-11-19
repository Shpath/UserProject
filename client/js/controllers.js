usersApp.controller('userListController', function ($scope, $routeParams, usersFactory, $location, $rootScope) {
    $scope.users = usersFactory.getAllUsers();
    if ($rootScope.successMessage) {
        $scope.successMessage = $rootScope.successMessage;
        delete $rootScope.successMessage;
    }
    $scope.deleteUser = function (user) {
        usersFactory.deleteUser(user);
        $scope.users = usersFactory.getAllUsers();
    }
});

usersApp.controller('userDetailsController', function ($scope, $routeParams, usersFactory, $http) {
    $scope.user = usersFactory.getUser($routeParams.id);
    if (!$scope.user) {
        $scope.userNotFound = true;
        return;
    }
    $scope.loadingRepos = true;
    $scope.repositories = [];
    $http({
        method: 'GET',
        url: 'https://api.github.com/users/' + $scope.user.gitHubId + '/repos',
    }).then(function successCallback(response) {
        $scope.loadingRepos = false;
        var repositories = response.data;
        if (repositories.length) {
            for (var key in repositories) {
                $scope.repositories.push({
                    name: repositories[key].name,
                    html_url: repositories[key].html_url,
                    description: repositories[key].description
                });
            }
        } else {
            $scope.noRepositories = true;
        }
    }, function errorCallback(response) {
        $scope.loadingRepos = false;
        $scope.error = true;
    });
});

usersApp.controller('newUserController', function ($scope, usersFactory, $location, $rootScope) {
    $scope.user = {};
    $scope.addUser = function () {
        var errorMessages = usersFactory.addUser($scope.user);
        if (errorMessages.length) {
            $scope.errorMessages = errorMessages;
        } else {
            $rootScope.successMessage = "User with ID: " + $scope.user.id + " created successfully!";
            $location.path('/users');
        }
    }
});

usersApp.controller('editUserController', function ($scope, $routeParams, usersFactory, $location, $rootScope) {
    var user = usersFactory.getUser($routeParams.id);
    if (!user) {
        $scope.userNotFound = true;
        return;
    }

    // Clone user so it's not modified without commiting changes
    $scope.user = JSON.parse(JSON.stringify(user));
    $scope.editUser = function () {
        var errorMessages = usersFactory.updateUser($scope.user);
        if (errorMessages.length) {
            $scope.errorMessages = errorMessages;
        } else {
            $rootScope.successMessage = "User with ID: " + $scope.user.id + " updated successfully!"
            $location.path('/users');
        }

    }
});
