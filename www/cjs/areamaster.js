var areamasterApp = angular.module('areamasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
areamasterApp.controller('areamasterController', function ($scope, $http, $window) {
    $scope.listareamasterdata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deleteareamasterchk = function (areaid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deleteareamaster(areaid);
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
    $scope.addareamaster = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8327/api/addareamaster/',
            data: $scope.areamasteradd,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added areamaster Successfully');
                    $window.location.reload();
                } else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.editareamaster = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8327/api/editareamaster/',
            data: $scope.getareamasterdata,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit areamaster  Successful');
                    $window.location.reload();
                } else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deleteareamaster = function (areaid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:8327/api/deleteareamaster/' + areaid,
                dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete areamaster Successful');
                        $window.location.reload();
                    } else {
                        alert('Unsuccessful');
                        $window.location.reload();
                    }
                };
            })
        }
    };
    $scope.getareamaster = function (areaid) {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/getareamaster/' + areaid,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getareamasterdata = response.data;
        });
    };
	
    $scope.listareamaster = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listareamaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listareamasterdata = response.data;
            $scope.mycountry = $scope.listareamasterdata;
            $scope.pagedItems = $scope.listareamasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listareamasterdata.length / $scope.pageSize);
        });
    };
	
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listareamasterdata.length / $scope.pageSize);
    };
	
	
	//======02-JAN-2017========
	$scope.setparameters=function(data){
		console.log(data);
		$scope.areamasteradd.routeid=data.routeid;
		$scope.areamasteradd.railwayline=data.railwayline;
	}
	
	$scope.listroutemaster = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listroutemaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listroutemasterdata = response.data;
        });
    };
	
	/* function doc_keyUp(e) {
		// this would test for whichever key is 40 and the ctrl key at the same time
		if (e.ctrlKey && e.keyCode==40) {
			// call your function to do the thing
			alert("HIIIII");
		}
	} */
	// register the handler 
	/* document.addEventListener('keyup', doc_keyUp, false); */
	
});
