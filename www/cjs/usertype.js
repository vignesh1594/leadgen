var usertypeApp = angular.module('usertypeApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
usertypeApp.controller('usertypeController', function ($scope, $http, $window) {
    $scope.listusertypedata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deleteusertypechk = function (usertypeid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deleteusertype(usertypeid);
            else alert('Cancelled , Your Data is Safe !');
        }, {
            return: true
        });
    };
    $scope.cleartext = function () {
        $window.location.reload();
    }
    $scope.checkcurrpage = function (myValue) {
        if (myValue - 1 <= 0) {
            $scope.currentPage = 0;
        }
        else {
            $scope.currentPage = myValue - 1;
            if (!$scope.currentPage) {
                $scope.currentPage = 0;
            }
        }
    };
    $scope.exportData = function (reportname) {
        $scope.pageSize = 1000;
        $scope.currentPage = 0;
        var blob = new Blob([document.getElementById('exportablenew').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, reportname);
    };
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function () {
        $timeout(function () {
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort = function (column) {
        if ($scope.orderProp === column) {
            $scope.direction = !$scope.direction;
        }
        else {
            $scope.orderProp = column;
            $scope.direction = false;
        }
    };
    $scope.addusertype = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/addusertype/'
            , data: $scope.usertypeadd
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added usertype Successfully');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.editusertype = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/editusertype/'
            , data: $scope.getusertypedata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit usertype  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deleteusertype = function (usertypeid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE'
                , url: 'http://localhost:8327/api/deleteusertype/' + usertypeid
                , dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete usertype Successful');
                        $window.location.reload();
                    }
                    else {
                        alert('Unsuccessful');
                        $window.location.reload();
                    }
                };
            })
        }
    };
    $scope.getusertype = function (usertypeid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getusertype/' + usertypeid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getusertypedata = response.data;
        });
    };
    $scope.listusertype = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listusertype'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listusertypedata = response.data;
            $scope.mycountry = $scope.listusertypedata;
            $scope.pagedItems = $scope.listusertypedata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listusertypedata.length / $scope.pageSize);
        });
    };
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listusertypedata.length / $scope.pageSize);
    };
});