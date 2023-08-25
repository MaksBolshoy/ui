/**
 Логика страницы администрирования приложения
*/
angular.module('app')
   .controller('adminController',

      function ($scope, $http, $routeParams, $location, $localStorage, $rootScope) {

         $scope.tryToLogout = function() {
            $scope.clearUser();
            $scope.user = null;
            $location.path('/');
         };

         $scope.clearUser = function() {
            delete $localStorage.springWebUser;
            $http.defaults.headers.common.Authorization = '';
         };

         $rootScope.goToUsers = function() {
            $http({
                method: 'GET',
                url: 'http://localhost:8008/users/admin'
            }).then(function successCallback(response) {
                $location.path('/admin/users');
            }, function failureCallback(response) {
                    alert('Только для админа!');
            });
         }

         $scope.goToMsg = function () {
            $http.get('http://localhost:8008/admin/messages')
               .then(function successCallback(response) {
                  $location.path('/admin/message');
               }, function failureCallback(response) {
                    alert('Только для админа!');
               });

         }

         $scope.register = function () {
             $http.post('http://localhost:8008/users/register', $scope.user)
                .then(function successCallback(response) {
                   $scope.user = null;
                   alert('Регистрация прошла успешно');
                   $location.path('/admin');
                }, function failureCallback(response) {
                   alert('Ошибка добавления пользователя в БД');
                });
         }

         $scope.addUsers = function () {
             $http.post('http://localhost:8008/users/admin/register', $scope.path)
                .then(function successCallback(response) {
                   $scope.path = null;
                   alert('Регистрация пользователей прошла успешно');
                   $location.path('/admin');
                }, function failureCallback(response) {
                   console.log(response);
                   alert('Ошибка добавления пользователей в БД');
                });
          }

          $scope.isAdmin = function() {
            if($localStorage.springWebUser) {
                return true;
            } else {
                $location.path("/login");
                return false;
            }
          }

          $scope.addPdf = function() {
            $http.post('http://localhost:8008/admin/pdf', $scope.pdf)
                .then(function successCallback(response) {
                    $scope.pdf = null;
                    alert('Загрузка файлов в хранилище прошла успешно');
                    $location.path('/admin');
                }, function failureCallback(response) {
                    console.log(response);
                    alert('statusCode: ' + response.data.statusCode + '; message: ' + response.data.message);
                });
          }

          $scope.addAuthHeader = function() {
            if ($localStorage.springWebUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
            }
          }
      });

