var leadmasterApp = angular.module('leadmasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
leadmasterApp.controller('leadmasterController', function ($scope, $http, $window) {
    $scope.listleadmasterdata = [];
    $scope.usertype = sessionStorage['usertype'];
    $scope.orderProp = '';
    $scope.direction = false;
    $scope.deleteleadmasterchk = function (leadid) {
        confirm('Are You Sure ? ', function (data) {
            if (data) $scope.deleteleadmaster(leadid);
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
    $scope.addleadmaster = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/addleadmaster/'
            , data: $scope.leadmasteradd
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added leadmaster Successfully');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.editleadmaster = function () {
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/editleadmaster/'
            , data: $scope.getleadmasterdata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit leadmaster  Successful');
                    $window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };
        })
    };
    $scope.deleteleadmaster = function (leadid) {
        var result = confirm('Are you sure?');
        if (result) {
            $http({
                method: 'DELETE'
                , url: 'http://localhost:8327/api/deleteleadmaster/' + leadid
                , dataType: 'jsonp'
            }).success(function (data) {
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                    if ($scope.status == 0) {
                        alert('Delete leadmaster Successful');
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
    $scope.getleadmaster = function (leadid) {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getleadmaster/' + leadid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getleadmasterdata = response.data;
        });
    };
    $scope.listleadmaster = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listleadmaster'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listleadmasterdata = response.data;
            $scope.mycountry = $scope.listleadmasterdata;
            $scope.pagedItems = $scope.listleadmasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listleadmasterdata.length / $scope.pageSize);
        });
    };
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listleadmasterdata.length / $scope.pageSize);
    };
	
	 $scope.listsalesuser = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listsalesuser'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listsalesuserdata = response.data;
			console.log($scope.listsalesuserdata);
            
        });
    };
	
	 $scope.onselectbulk = function (id) {
		 console.log(id)
		// $scope.salesid=[];
		 /* console.log($scope.listsalesuserdata);
		 for(var i=0;i<$scope.listsalesuserdata.length;i++){
			
		console.log($scope.listsalesuserdata[i].clientid+"=="+id);
		 if($scope.listsalesuserdata[i].clientid==id){ */
		$scope.SelectedProducts.balance=id.balance;
		$scope.SelectedProducts.deliveredquantity=id.deliveredquantity;
		$scope.SelectedProducts.salesid=id.salesid;
		$scope.SelectedProducts.allocatedto=id.clientid;
		$scope.salesid=id.salesid;
	
		 /* }
		 	break;
		 } */
		 console.log($scope.salesid)
		 $http({
            method: 'GET',
            url: 'http://localhost:8327/api/getbulkarea/'+$scope.salesid,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getbulkareadata = response.data;
			$scope.listcitysearch($scope.getbulkareadata);
        }); 
	 }
	
	//----------------------Start multi city search-----------
	$scope.capability=[];

	$scope.addcapablity=function(data){
		var flag=0;
		for(var i=0;i<$scope.getbulkareadata.length;i++){
			if($scope.getbulkareadata[i].id==data.id){
				flag=1;
				break;
			}
		}
		if(flag==0){
			$scope.getbulkareadata.push({"city":data.city});
			console.log($scope.getbulkareadata)
			$scope.listcitysearch($scope.getbulkareadata);
			
			
		}
	}
	
	$scope.deletecapablity = function(receiver) {
		for(var i=0; i<$scope.getbulkareadata.length; i++) 
		{
			if($scope.getbulkareadata[i] === receiver) 
			{
				$scope.getbulkareadata.splice(i, 1);
				break;
			}
		}
	}
	//----------------------End multi city search-----------

	$scope.listcitysearch = function (capability) {
		//console.log(capability)
		$scope.capability=capability;
          $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/listcitysearch/'
            , data: $scope.capability
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            $scope.listleadmasterdata = data.result;
			console.log($scope.listleadmasterdata);
        }); 
    };
	
	
	$scope.SelectedProductsid = [];
	
	$scope.multiplesale = function () {
		console.log($scope.SelectedProducts)
		  $scope.SelectedProducts.details=$scope.SelectedProductsid;
		  console.log($scope.SelectedProducts)
         $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/multiplesale/'
            , data: $scope.SelectedProducts
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Edit leadmaster  Successful');
                    //$window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    //$window.location.reload();
                }
            };
        }) 
    };
	
	//-----------------Start get city code-------------
	
	$scope.listcitygroup = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listcitygroup',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listcitygroupdata = response.data;
			console.log($scope.listcitygroupdata);
        });
    };
	
	
	
	
	
	//-----------------End get country code-------------
	
	
	//--------------checkbox start----------
	
	
	$scope.syncfordelete = function(leadid){
		console.log(leadid);
		if(leadid){
		  // add item
		   $scope.SelectedProductsid.push(leadid);
		}
		else {
		  // remove item
		  for(var i=0 ; i < $scope.SelectedProductsid.length; i++) {
			if($scope.SelectedProductsid[i].leadid == leadid){
			  $scope.SelectedProductsid.splice(i,1);
			}
		  }         
		}
		console.log($scope.SelectedProductsid);
	};

	$scope.isCheckeddelete = function(leadid){
		
		var match = false;
		for(var i=0 ; i < $scope.SelectedProductsid.length; i++) {
			if($scope.SelectedProductsid[i].leadid == leadid)
			{
			  match = true;
			}
		}
		  //return match;
		  return match;
	};  
  
  //-----------------checkbox end
  
  
  
  
  //------------------End receipt======================
	
});