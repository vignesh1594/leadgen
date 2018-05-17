var productdetailsApp = angular.module('productdetailsApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
productdetailsApp.controller('productdetailsController', function ($scope, $http, $window) {
    $scope.listproductdetailsdata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deleteproductdetailschk = function (productdetailid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deleteproductdetails(productdetailid);
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
    $scope.addproductdetails = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/addproductdetails/'
            , data: $scope.productdetailsadd
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added productdetails Successfully');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.editproductdetails = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/editproductdetails/'
            , data: $scope.getproductdetailsdata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit productdetails  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deleteproductdetails = function (productdetailid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE'
                , url: 'http://localhost:8327/api/deleteproductdetails/' + productdetailid
                , dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete productdetails Successful');
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
	
    $scope.getproductdetails = function (productdetailid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getproductdetails/' + productdetailid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getproductdetailsdata = response.data;
        });
    };
	
    $scope.listproductdetails = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listproductdetails'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listproductdetailsdata = response.data;
            $scope.mycountry = $scope.listproductdetailsdata;
            $scope.pagedItems = $scope.listproductdetailsdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listproductdetailsdata.length / $scope.pageSize);
        });
    };
	
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listproductdetailsdata.length / $scope.pageSize);
    };
	
	///================02-JAN-2018==================
	
	$scope.getproducts = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getproducts'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getproductsdata = response.data;
			console.log($scope.getproductsdata);
        });
    };
	
	
	
});