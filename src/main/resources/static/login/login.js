/**
 Логика страницы входа (логина)
*/
angular.module('app').controller('loginController', function ($scope, $http, $localStorage, $location, $window) {
   const contextPath = 'http://localhost:8008/login';

   $scope.tryToAuth = function () {
      $http.post(contextPath, $scope.user)
         .then(function successCallback(response) {
            if (response.data.token) {
               $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
               $localStorage.springWebUser = { username: $scope.user.username, token: response.data.token };
               $scope.user.username = null;
               $scope.user.password = null;
               $location.path('/admin');
            }
         }, function errorCallback(response) {
            alert('Неверный логин или пароль!')
         });
   };

});