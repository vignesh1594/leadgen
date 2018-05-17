var salesmasterApp = angular.module('salesmasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
salesmasterApp.controller('salesmasterController', function ($scope, $http, $window) {
	
    $scope.listsalesmasterdata = [];
	$scope.userid1=localStorage['userid1'];
	$scope.userid=sessionStorage['userid'];
	$scope.usertype=sessionStorage['usertype'];
	$scope.dataid=localStorage['dataid'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deletesalesmasterchk = function (salesid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deletesalesmaster(salesid);
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
	
		
    $scope.addsalesmaster = function () {
		if($scope.salesmasteradd.Type=="customer")
		{
			$scope.salesmasteradd.custyomerdetails=$scope.customeradd;
		}
		else if($scope.salesmasteradd.Type=="xcustomer")
		{
			$scope.salesmasteradd.custyomerdetails=$scope.customeroldadd;
		}
		$scope.salesmasteradd.leadsquantity=$scope.getplandata.leadsquantity;
		$scope.salesmasteradd.quotedamount=$scope.getplandata.quotedamount; 
		$scope.salesmasteradd.usertype = "Sales User";
		$scope.salesmasteradd.salesdetails = $scope.capability;
		/* $scope.customer.name = $scope.salesmasteradd.name;
		$scope.customer.emailid1 = $scope.salesmasteradd.emailid1;
		$scope.customer.mobileno1 = $scope.salesmasteradd.mobileno1; 
		$scope.salesmasteradd.country = "india";
		$scope.customer.state = $scope.salesmasteradd.state;
		$scope.customer.statecode = $scope.salesmasteradd.statecode;
		$scope.customer.city = $scope.salesmasteradd.city;
		$scope.customer.gstno = $scope.salesmasteradd.gstno;
		$scope.customer.tanno = $scope.salesmasteradd.tanno;
		$scope.customer.panno = $scope.salesmasteradd.panno; */
		console.log($scope.salesmasteradd);
         $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/addsalesmaster/'
            , data: $scope.salesmasteradd
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added salesmaster Successfully');
                    //$window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                   // $window.location.reload();
                }
            };
        })  
    };
    $scope.editsalesmaster = function () {
		$scope.getsalesmasterdata[0].salesdetails=$scope.getsalesdetailsmasterdata;
		console.log($scope.getsalesmasterdata);
          $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/editsalesmaster/'
            , data: $scope.getsalesmasterdata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit salesmaster  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            }; 
        }) 
    };
    $scope.deletesalesmaster = function (salesid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE'
                , url: 'http://localhost:8327/api/deletesalesmaster/' + salesid
                , dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete salesmaster Successful');
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
    $scope.getsalesmaster = function (salesid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getsalesmaster/' +salesid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getsalesmasterdata = response.data;
        });
    };
	$scope.getsalesdetailsmaster = function (salesid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getsalesdetailsmaster/' +salesid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getsalesdetailsmasterdata = response.data;
			console.log($scope.getsalesdetailsmasterdata);
        });
    };
    $scope.listsalesmaster = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listsalesmaster'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listsalesmasterdata = response.data;
            $scope.mycountry = $scope.listsalesmasterdata;
            $scope.pagedItems = $scope.listsalesmasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listsalesmasterdata.length / $scope.pageSize);
        });
    };
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listsalesmasterdata.length / $scope.pageSize);
    };
	
	//----------------------Start multi city search-----------
	$scope.capability=[];

	$scope.addcapablity=function(data){
		
		var flag=0;
		for(var i=0;i<$scope.capability.length;i++){
			if($scope.capability[i].id==data.id){
				flag=1;
				break;
			}
		}
		if(flag==0){
			$scope.capability.push(data);
			//$scope.capability.push({"city":data.city});
			
			//$scope.listcitysearch($scope.capability);
			
			
		}
	}
	
	$scope.deletecapablity = function(receiver) {
		for(var i=0; i<$scope.capability.length; i++) 
		{
			if($scope.capability[i] === receiver) 
			{
				$scope.capability.splice(i, 1);
				break;
			}
		}
	}
	//===========edit multiple city=============
	
	$scope.addcapablityforedit=function(data){
		console.log(data)
		var flag=0;
		data.cityid=data.id;
		data.city=data.city;
		for(var i=0;i<$scope.getsalesdetailsmasterdata.length;i++){
			if($scope.getsalesdetailsmasterdata[i].cityid==data.id){
				flag=1;
				break;
			}
		}
		if(flag==0){
			
			$scope.getsalesdetailsmasterdata.push(data);
			console.log($scope.getsalesdetailsmasterdata)
		}
	}
	
	$scope.deletecapablityforedit = function(receiver) {
		for(var i=0; i<$scope.getsalesdetailsmasterdata.length; i++) 
		{
			if($scope.getsalesdetailsmasterdata[i] === receiver) {
				$scope.getsalesdetailsmasterdata.splice(i, 1);
				break;
			}
		}
	}
	
	
	
	//----------------------End multi city search-----------
	
	
	//RAHUL, CHANGES 18-01-2018
	$scope.listsalesidmaster = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listsalesidmaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.clientdata = response.data;
			//console.log($scope.clientdata);
        });		
    };
	
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
	
	$scope.getplandata=[{}];
	$scope.onselectplan=function(data){
		//console.log(data);
		for(var i=0;i<$scope.plandata.length;i++)
		{
			if($scope.plandata[i].planid==data)
			{
				$scope.salesmasteradd.leadsquantity=$scope.plandata[i].leadsquantity;
				$scope.salesmasteradd.quotedamount=$scope.plandata[i].price;
			}
		}
		if($scope.salesmasteradd.freeflag == "no" || $scope.salesmasteradd.freeflag == undefined|| $scope.salesmasteradd.freeflag == undefined &&  $scope.salesmasteradd.freequantity == null)
		{
			$scope.salesmasteradd.totalquantity = $scope.salesmasteradd.leadsquantity;
			$scope.salesmasteradd.balance = $scope.salesmasteradd.totalquantity;
			//console.log($scope.salesmasteradd.totalquantity);
		}
		//console.log($scope.getplandata);
	}
	
	$scope.onselectplanedit=function(data){
		//console.log(data);
		for(var i=0;i<$scope.plandata.length;i++)
		{
			if($scope.plandata[i].planid==data)
			{
				$scope.getsalesmasterdata[0].leadsquantity=$scope.plandata[i].leadsquantity;
				$scope.getsalesmasterdata[0].quotedamount=$scope.plandata[i].price;
			}
		}
		//console.log($scope.getplandata);
	}
	
	$scope.getcountry = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/getcountry',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getinformation = response.data;
			//console.log($scope.getinformation);
        });		
    };
	
	$scope.GetSelectedDetails = function (x) {
		console.log(x);
		$scope.salesmasteradd.statecode =x.code;	
		$scope.salesmasteradd.state =x.state;	
		
		if($scope.salesmasteradd.statecode!=27)
		{
			$scope.salesmasteradd.igst = 18;
		}
		else if($scope.salesmasteradd.statecode==27)
		{
			$scope.salesmasteradd.sgst = 9;
			$scope.salesmasteradd.cgst = 9;
		}
		//console.log($scope.salesmasteradd.state);
    };
	
	$scope.gettotalamount = function (amount) {
		//console.log(amount);
		$scope.salesmasteradd.sellingamount =  (amount - (amount * ($scope.salesmasteradd.discount/100)));
		//console.log($scope.salesmasteradd.sellingamount);
		$scope.salesmasteradd.totalamount = ($scope.salesmasteradd.sellingamount + ($scope.salesmasteradd.sellingamount * (18/100)));
		//console.log($scope.salesmasteradd.totalamount);
    };
	
	$scope.gettotalamountedit = function (amount) {
		//console.log(amount);
		$scope.getsalesmasterdata[0].sellingamount =  (amount - (amount * ($scope.getsalesmasterdata[0].discount/100)));
		//console.log($scope.salesmasteradd.sellingamount);
		$scope.getsalesmasterdata[0].totalamount = ($scope.getsalesmasterdata[0].sellingamount + ($scope.getsalesmasterdata[0].sellingamount * (18/100)));
		//console.log($scope.salesmasteradd.totalamount);
    };
	
	$scope.totalcount = function (count){
		$scope.salesmasteradd.totalquantity = $scope.salesmasteradd.leadsquantity + count;
		$scope.salesmasteradd.balance = $scope.salesmasteradd.totalquantity;
		//console.log($scope.salesmasteradd.totalquantity);
	};
	
	$scope.totalcountedit = function (count){
		$scope.getsalesmasterdata[0].totalquantity = $scope.getsalesmasterdata[0].leadsquantity + count;
		$scope.getsalesmasterdata[0].balance = $scope.getsalesmasterdata[0].totalquantity;
		//console.log($scope.salesmasteradd.totalquantity);
	};
});