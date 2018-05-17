var datamasterApp = angular.module('datamasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
datamasterApp.controller('datamasterController', function ($scope, $http, $window) {
	var socket = io();
    $scope.listdatamasterdata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deletedatamasterchk = function (dataid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deletedatamaster(dataid);
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
	
	$scope.todaysdate=new Date();
	$scope.currentyear=new Date().getFullYear();
	$scope.currentmonth=new Date().getMonth()+1;
	$scope.currentday=new Date().getDate();
	$scope.firstday=$scope.currentyear+"-"+$scope.currentmonth+"-01";
	$scope.today=$scope.currentyear+"-"+$scope.currentmonth+"-"+$scope.currentday;
	
    $scope.adddatamaster = function () {
		$scope.datamasteradd.detaileddata=$scope.getproductdetailsdata;
        $http({
            method: 'POST', 
			url: 'http://localhost:8327/api/adddatamaster/', 
			data: $scope.datamasteradd,
			headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
			alert(data.message);
			$scope.listdatamaster($scope.fromdate,$scope.todate);
			if(data.status==0){
				socket.emit('adddata',$scope.datamasteradd);
			}
        })
    };
	
    $scope.editdatamaster = function () {
		$scope.getdatamasterdata[0].detaileddata=$scope.getformdetailsdata;
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/editdatamaster/'
            , data: $scope.getdatamasterdata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit datamaster  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
	
    $scope.deletedatamaster = function (dataid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE'
                , url: 'http://localhost:8327/api/deletedatamaster/' + dataid
                , dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete datamaster Successful');
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
	
    $scope.getdatamaster = function (dataid) {
		$scope.getformdetails(dataid);
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getdatamaster/' + dataid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getdatamasterdata = response.data;
        });
    };
	
	$scope.getformdetails = function (dataid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getformdetails/' + dataid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getformdetailsdata = response.data;
			console.log( $scope.getformdetailsdata);
        });
    };
	
    
	
    $scope.listdatamaster = function (fromdate,todate) {
		console.log(fromdate);
		console.log(todate);
		var flag=0;
		
		if(fromdate==undefined || todate==undefined)
		{
			flag=1;
		}
		if(flag==0){
			
			var toyear=new Date(todate).getFullYear();
			var tomonth=new Date(todate).getMonth() +1;
			var today=new Date(todate).getDate();
			todate=toyear+"-"+tomonth+"-"+today; 
			var fromyear=new Date(fromdate).getFullYear();
			var frommonth=new Date(fromdate).getMonth() +1;
			var fromday=new Date(fromdate).getDate();
			fromdate=fromyear+"-"+frommonth+"-"+fromday; 
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listdatamaster/'+fromdate+'/'+todate,
			dataType: 'jsonp'
        }).then(function (response) {
            $scope.listdatamasterdata = response.data;
			console.log($scope.listdatamasterdata);
            $scope.mycountry = $scope.listdatamasterdata;
            $scope.pagedItems = $scope.listdatamasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listdatamasterdata.length / $scope.pageSize);
        });
		}
    };
	
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listdatamasterdata.length / $scope.pageSize);
    };
	///=======02-JAN-2018=============
	
	$scope.getproductdetails=function(){
		var productid=1;
		$http({
            method: 'GET',
			url: 'http://localhost:8327/api/fetchproductdetails/' + productid, 
			dataType: 'jsonp'
        }).then(function (response) {
			console.log(response.data);
            $scope.getproductdetailsdata = response.data;
        });
	}
	
	$scope.listareamaster = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listareamaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listareamasterdata = response.data;
			console.log($scope.listareamasterdata);
        });
    };
	
	$scope.onselectarea=function(data){
		$scope.datamasteradd.area=data.area;
		$scope.datamasteradd.route=data.railwayline;
	}

});