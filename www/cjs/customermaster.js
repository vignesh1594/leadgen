var usermasterApp = angular.module('usermasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
usermasterApp.controller('usermasterController', function ($scope, $http, $window) {
    $scope.listusermasterdata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deleteusermasterchk = function (userid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deleteusermaster(userid);
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
    $scope.addusermaster = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/addcustomermaster/'
            , data: $scope.usermasteradd
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added usermaster Successfully');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
	
    $scope.editusermaster = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/editcustomermaster/'
            , data: $scope.getusermasterdata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit usermaster  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deleteusermaster = function (userid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE'
                , url: 'http://localhost:8327/api/deletecustomermaster/' + userid
                , dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete usermaster Successful');
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
    $scope.getusermaster = function (userid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getcustomermaster/' + userid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getusermasterdata = response.data;
        });
    };
    $scope.listusermaster = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listcustomermaster'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listusermasterdata = response.data;
            $scope.mycountry = $scope.listusermasterdata;
            $scope.pagedItems = $scope.listusermasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listusermasterdata.length / $scope.pageSize);
        });
    };
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listusermasterdata.length / $scope.pageSize);
    };
});