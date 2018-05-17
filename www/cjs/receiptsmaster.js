var receiptsmasterApp = angular.module('receiptsmasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
receiptsmasterApp.controller('receiptsmasterController', function ($scope, $http, $window) {
    $scope.listreceiptsmasterdata = [];
	$scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deletereceiptsmasterchk = function (receiptid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deletereceiptsmaster(receiptid);
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
    $scope.addreceiptsmaster = function () {
		if($scope.receiptsmasteradd.chequedate)
		{
				var yy=$scope.receiptsmasteradd.chequedate.getFullYear();
				var mm=$scope.receiptsmasteradd.chequedate.getMonth()+1;
				var dd=$scope.receiptsmasteradd.chequedate.getDate();
				$scope.receiptsmasteradd.chequedate=yy+"-"+mm+"-"+dd;
		}
		$scope.receiptsmasteradd.salesid=$scope.receiptsmasteradd.sales.salesid;
		$scope.receiptsmasteradd.clientid=$scope.receiptsmasteradd.sales.clientid;
		
		
		console.log($scope.receiptsmasteradd.sales.salesid)
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/addreceiptsmaster/'
            , data: $scope.receiptsmasteradd
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
			console.log(data.status)
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added receiptsmaster Successfully');
                   // $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    //$window.location.reload();
                }
            };
        })
    };
    $scope.editreceiptsmaster = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/editreceiptsmaster/'
            , data: $scope.getreceiptsmasterdata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit receiptsmaster  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deletereceiptsmaster = function (receiptid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE'
                , url: 'http://localhost:8327/api/deletereceiptsmaster/' + receiptid
                , dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete receiptsmaster Successful');
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
    $scope.getreceiptsmaster = function (receiptid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getreceiptsmaster/' + receiptid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getreceiptsmasterdata = response.data;
        });
    };
    $scope.listreceiptsmaster = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listreceiptsmaster'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listreceiptsmasterdata = response.data;
            $scope.mycountry = $scope.listreceiptsmasterdata;
            $scope.pagedItems = $scope.listreceiptsmasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listreceiptsmasterdata.length / $scope.pageSize);
        });
    };
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listreceiptsmasterdata.length / $scope.pageSize);
    };
	
	//------------------Start receipt======================
  $scope.listsalereceipt = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listsalereceipt',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listsalereceiptdata = response.data;
			console.log($scope.listsalereceiptdata);
        });		
    };
	
	 $scope.getparticularsaleid = function (id) {
		 console.log(id);
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/gettotalsaleid/'+id,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.gettotalsaleiddata = response.data;
			console.log($scope.gettotalsaleiddata);
			console.log($scope.gettotalsaleiddata.length);
			if($scope.gettotalsaleiddata[0].total==null){
				
				$scope.receiptsmasteradd.totalamountrecieved=0;
			}
			else {
			$scope.receiptsmasteradd.totalamountrecieved=$scope.gettotalsaleiddata[0].total;
			}
        });

			console.log(id)
			$http({
            method: 'GET',
            url: 'http://localhost:8327/api/getparticularsaleid/'+id,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getparticularsaleiddata = response.data;
			console.log($scope.getparticularsaleiddata);
			
        });
			
			
    };
	
	
	$scope.onselectsale = function (id) {
	console.log(id)
	 $scope.getparticularsaleid(id.salesid);
	$scope.receiptsmasteradd.amount=id.totalamount;
	$scope.receiptsmasteradd.planid=id.planid;
	$scope.receiptsmasteradd.statecode=id.statecode;
	$scope.receiptsmasteradd.cgst=id.cgst;
	$scope.receiptsmasteradd.sgst=id.sgst;
	$scope.receiptsmasteradd.igst=id.igst;
	
/* 	 $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getonselectsalemaster/' +receiptid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getreceiptsmasterdata = response.data;
        }); */
	}
	
	$scope.listplan = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listlistplanforlead',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.plandata = response.data;
			//console.log($scope.plandata);
        });		
    };
	//------------------End receipt======================
});