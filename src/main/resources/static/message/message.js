/**
 Страница с форомой отправки сообщения
*/
angular.module('app')
   .controller('messageController',

      function ($scope, $http, $localStorage, $location) {

          $scope.isAdmin = function() {
            if($localStorage.springWebUser) {
                return true;
            } else {
                $location.path("/login");
                return false;
            }
          }

         $scope.create = function() {
             $http.post('http://localhost:8008/admin/messages', $scope.context)
                .then(function successCallback(response) {
                   $scope.context = null;
                   alert('Сообщение успешно создано');
                   $location.path('/admin');
                }, function failureCallback(response) {
                   alert('Ошибка добавления сообщения в БД');
                });
         }

         $scope.loadFileNames = function() {
             $http.get('http://localhost:8008/admin/messages/files')
                .then(function(response) {
                    $scope.filenames = response.data;
                });
         };

         $scope.show = function() {
            $http.get('http://localhost:8008/admin/messages')
                .then(function successCallback(response) {
                    $location.path('/admin/messages');
                });
         };

         $scope.loadFileNames();
      });
