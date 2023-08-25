/**
 Страница со списком статусов сообщений
*/
angular.module('app')
   .controller('messagesController',

      function ($scope, $http, $localStorage, $location) {
        const contextPath = 'http://localhost:8008/admin/messages/';
        let currentPageIndex = 1;

        $scope.loadMessages = function (pageIndex = 1) {
            currentPageIndex = pageIndex;
            $http({
                method: 'GET',
                url: contextPath,
                params: {
                    page: pageIndex
                }
            }).then(function (response) {
                $scope.pages = response.data;
                $scope.msgPage = response.data.content;
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

        $scope.updateMsg = function (id) {
            $http.patch(contextPath + id)
                .then(function successCallback (response) {
                    $scope.loadMessages(currentPageIndex);
                }, function errorCallback(response) {
                    alert(response.data.message);
                });
        }

        $scope.deleteMsg = function (id) {
            $http.delete(contextPath + id)
                .then(function successCallback (response) {
                    $scope.loadMessages(currentPageIndex);
                }, function errorCallback(response) {
                    alert(response.data.message);
                });
        }

        $scope.deleteSentMsg = function () {
            $http.delete(contextPath)
                .then(function successCallback (response) {
                    $scope.loadMessages(currentPageIndex);
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

        $scope.loadMessages();
      });
