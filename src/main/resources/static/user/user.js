/**
 Логика страницы управления пользователями
*/
angular.module('app')
    .controller('userController', function ($scope, $http, $location, $localStorage) {
        const contextPath = 'http://localhost:8008/users';
        let currentPageIndex = 1;

        $scope.loadUsers = function (pageIndex = 1) {
            currentPageIndex = pageIndex;
            $http({
                method: 'GET',
                url: contextPath + '/admin',
                params: {
                    page: pageIndex
                }
            }).then(function (response) {
                $scope.pages = response.data;
                $scope.usersPage = response.data.content;
                $scope.paginationArray = $scope.generatePagesIndexes(1, $scope.pages.totalPages);
            });
        };

        $scope.generatePagesIndexes = function (startPage, endPage) {
            let pages = [];
            for (let i = startPage; i < endPage + 1; i++) {
                pages.push(i);
            }
            return pages;
        }

        $scope.deleteUser = function (id) {
            $http.delete(contextPath + '/admin/' + id)
                .then(function successCallback (response) {
                    $scope.loadUsers(currentPageIndex);
                }, function errorCallback(response) {
                    alert(response.data.message);
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

         $scope.loadUsers();
    });
