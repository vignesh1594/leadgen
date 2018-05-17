var productmasterApp = angular.module('productmasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
productmasterApp.controller('productmasterController', function ($scope, $http, $window) {
	$scope.usertype=sessionStorage["usertype"];
	$scope.userid=sessionStorage["userid"];
    $scope.listproductmasterdata = [];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deleteproductmasterchk = function (productid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deleteproductmaster(productid);
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
    $scope.addproductmaster = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/addproductmaster/'
            , data: $scope.productmasteradd
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added productmaster Successfully');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.editproductmaster = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/editproductmaster/'
            , data: $scope.getproductmasterdata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit productmaster  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deleteproductmaster = function (productid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE'
                , url: 'http://localhost:8327/api/deleteproductmaster/' + productid
                , dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete productmaster Successful');
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
    $scope.getproductmaster = function (productid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getproductmaster/' + productid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getproductmasterdata = response.data;
        });
    };
    $scope.listproductmaster = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listproductmaster'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listproductmasterdata = response.data;
            $scope.mycountry = $scope.listproductmasterdata;
            $scope.pagedItems = $scope.listproductmasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listproductmasterdata.length / $scope.pageSize);
        });
    };
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listproductmasterdata.length / $scope.pageSize);
    };
});