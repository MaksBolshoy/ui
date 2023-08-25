/**
 Логика главной страницы
*/
angular.module('app').controller('mainController', function ($scope, $http, $location, $localStorage, $rootScope) {

    $scope.register = function() {
        $http.post('http://localhost:8008/users/register', $scope.user)
            .then(function successCallback(response) {
                $scope.user = null;
                alert('Регистрация прошла успешно');
                $location.path('/');
            }, function failureCallback(response) {
                   console.log(response.data)
            });
    }

     $rootScope.isAdmin = function () {
        if ($localStorage.springWebUser) {
            return true;
        } else {
            return false;
        }
     };

});