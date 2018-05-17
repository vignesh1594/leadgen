var routemasterApp = angular.module('routemasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
routemasterApp.controller('routemasterController', function ($scope, $http, $window) {
    $scope.listroutemasterdata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deleteroutemasterchk = function (routeid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deleteroutemaster(routeid);
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
        } else {
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
        } else {
            $scope.orderProp = column;
            $scope.direction = false;
        }
    };
    $scope.addroutemaster = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8327/api/addroutemaster/',
            data: $scope.routemasteradd,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added routemaster Successfully');
                    $window.location.reload();
                } else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.editroutemaster = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8327/api/editroutemaster/',
            data: $scope.getroutemasterdata,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit routemaster  Successful');
                    $window.location.reload();
                } else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deleteroutemaster = function (routeid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:8327/api/deleteroutemaster/' + routeid,
                dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete routemaster Successful');
                        $window.location.reload();
                    } else {
                        alert('Unsuccessful');
                        $window.location.reload();
                    }
                };
            })
        }
    };
    $scope.getroutemaster = function (routeid) {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/getroutemaster/' + routeid,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getroutemasterdata = response.data;
        });
    };
	
    $scope.listroutemaster = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listroutemaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listroutemasterdata = response.data;
            $scope.mycountry = $scope.listroutemasterdata;
            $scope.pagedItems = $scope.listroutemasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listroutemasterdata.length / $scope.pageSize);
        });
    };
	
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listroutemasterdata.length / $scope.pageSize);
    };
});