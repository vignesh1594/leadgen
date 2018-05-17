var interactionmasterApp = angular.module('interactionmasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
interactionmasterApp.controller('interactionmasterController', function ($scope, $http, $window) {
    $scope.listinteractionmasterdata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deleteinteractionmasterchk = function (leadid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deleteinteractionmaster(leadid);
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
    $scope.addinteractionmaster = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8327/api/addinteractionmaster/',
            data: $scope.interactionmasteradd,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added interactionmaster Successfully');
                    $window.location.reload();
                } else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.editinteractionmaster = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8327/api/editinteractionmaster/',
            data: $scope.getinteractionmasterdata,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit interactionmaster  Successful');
                    $window.location.reload();
                } else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deleteinteractionmaster = function (leadid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:8327/api/deleteinteractionmaster/' + leadid,
                dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete interactionmaster Successful');
                        $window.location.reload();
                    } else {
                        alert('Unsuccessful');
                        $window.location.reload();
                    }
                };
            })
        }
    };
    $scope.getinteractionmaster = function (leadid) {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/getinteractionmaster/' + leadid,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getinteractionmasterdata = response.data;
        });
    };
    $scope.listinteractionmaster = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listinteractionmaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listinteractionmasterdata = response.data;
            $scope.mycountry = $scope.listinteractionmasterdata;
            $scope.pagedItems = $scope.listinteractionmasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listinteractionmasterdata.length / $scope.pageSize);
        });
    };
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listinteractionmasterdata.length / $scope.pageSize);
    };
});
