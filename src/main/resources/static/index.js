(function () {
    angular
        .module('app', ['ngRoute', 'ngStorage'])
        .config(config)
        .run(run);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/main/main.html',
                controller: 'mainController'
            })
            .when('/admin', {
                templateUrl: '/admin/admin.html',
                controller: 'adminController'
            })
            .when('/admin/users', {
                templateUrl: '/user/user.html',
                controller: 'userController'
            })
            .when('/admin/message', {
                templateUrl: '/message/message.html',
                controller: 'messageController'
            })
            .when('/admin/messages', {
                templateUrl: '/messages/messages.html',
                controller: 'messagesController'
            })
            .when('/login', {
                templateUrl: '/login/login.html',
                controller: 'loginController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

        function run($rootScope, $http, $localStorage) {
            if ($localStorage.springWebUser) {
                try {
                    let jwt = $localStorage.springWebUser.token;
                    let payload = JSON.parse(atob(jwt.split('.')[1]));
                    let currentTime = parseInt(new Date().getTime() / 1000);
                    if (currentTime > payload.exp) {
                        console.log("Token is expired!!!");
                        delete $localStorage.springWebUser;
                        $http.defaults.headers.common.Authorization = '';
                    }
                } catch (e) { }
            }

        }
})();

angular.module('app').controller('indexController',
    function ($scope, $rootScope, $http, $localStorage, $location, $window) {
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
        }
});