var datadetailsApp = angular.module('datadetailsApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
datadetailsApp.controller('datadetailsController', function ($scope, $http, $window) {
    $scope.listdatadetailsdata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deletedatadetailschk = function (datadetailid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deletedatadetails(datadetailid);
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
    $scope.adddatadetails = function () {
        $http({
            method: 'POST',
			url: 'http://localhost:8327/api/adddatadetails/',
			data: $scope.datadetailsadd,
			headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added datadetails Successfully');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.editdatadetails = function () {
        $http({
            method: 'POST',
			url: 'http://localhost:8327/api/editdatadetails/', 
			data: $scope.getdatadetailsdata,
			headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit datadetails  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deletedatadetails = function (datadetailid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE',
				url: 'http://localhost:8327/api/deletedatadetails/' + datadetailid,
				dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete datadetails Successful');
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
    $scope.getdatadetails = function (datadetailid) {
        $http({
            method: 'GET',
			url: 'http://localhost:8327/api/getdatadetails/' + datadetailid,
			dataType: 'jsonp'
        }).then(function (response) {
            $scope.getdatadetailsdata = response.data;
        });
    };
    $scope.listdatadetails = function () {
        $http({
            method: 'GET',
			url: 'http://localhost:8327/api/listdatadetails',
			dataType: 'jsonp'
        }).then(function (response) {
            $scope.listdatadetailsdata = response.data;
            $scope.mycountry = $scope.listdatadetailsdata;
            $scope.pagedItems = $scope.listdatadetailsdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listdatadetailsdata.length / $scope.pageSize);
        });
    };
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listdatadetailsdata.length / $scope.pageSize);
    };
});