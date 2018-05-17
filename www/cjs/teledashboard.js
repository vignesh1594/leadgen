var datamasterApp = angular.module('datamasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
datamasterApp.controller('datamasterController', function ($scope, $http, $window,$timeout,$interval) {
    $scope.listdatamasterdata = [];
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
	$scope.usertype=sessionStorage['usertype'];
    $scope.adddatamaster = function () {
		console.log($scope.getproductdetailsdata);
		$scope.listbigdatamasterdata[0].detaileddata=$scope.getproductdetailsdata;
		console.log($scope.listbigdatamasterdata[0].detaileddata);
		
		/* $scope.date = new Date($scope.listbigdatamasterdata[0].rescheduletodate).getDate();
		$scope.year = new Date($scope.listbigdatamasterdata[0].rescheduletodate).getFullYear();
		$scope.month = new Date($scope.listbigdatamasterdata[0].rescheduletodate).getMonth()+1;
		$scope.redate = $scope.year + "-" + $scope.month + "-" + $scope.date;
		$scope.listbigdatamasterdata[0].rescheduletodate=$scope.redate; */
		/* var idate = new Date($scope.listbigdatamasterdata[0].rescheduletime).getMinutes();
		var iyear = new Date($scope.listbigdatamasterdata[0].rescheduletime).getHours();
		$scope.listbigdatamasterdata[0].rescheduletime = iyear +":"+ idate; */
		datetime = new Date($scope.listbigdatamasterdata[0].rescheduletime);
        var hours = datetime.getHours() > 12 ? datetime.getHours() - 12 : datetime.getHours();
        var am_pm = datetime.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var seconds = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
		$scope.listbigdatamasterdata[0].rescheduletime = time;
		console.log($scope.listbigdatamasterdata);
        $http({
            method: 'POST'
            , url: 'http://localhost:8327/api/adddatamaster1/'
            , data: $scope.listbigdatamasterdata
            , headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added datamaster Successfully');
                    //$window.location.reload();
                }
                else {
                    alert('Unsuccessful');
                    //$window.location.reload();
                }
            };
        }) 
    };
	
    $scope.editdatamaster = function () {
		$scope.getdatamasterdata[0].detaileddata=$scope.getformdetailsdata;
        $http({
            method: 'POST',
			url: 'http://localhost:8327/api/editdatamaster/',
			data: $scope.getdatamasterdata ,
			headers: {
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
		//$scope.getformdetails(dataid);
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getdatamaster/' + dataid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getdatamasterdata = response.data;
        });
    };
	
	$scope.getformdetails = function (dataid) {
		console.log(dataid)
		alert(dataid)
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/getformdetails/' + dataid
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.getformdetailsdata = response.data;
			console.log( $scope.getformdetailsdata);
			console.log( $scope.getformdetailsdata.length);
			
        });
    };
	
    $scope.listdatamaster = function () {
        $http({
            method: 'GET'
            , url: 'http://localhost:8327/api/listdatamaster'
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.listdatamasterdata = response.data;
            $scope.mycountry = $scope.listdatamasterdata;
            $scope.pagedItems = $scope.listdatamasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listdatamasterdata.length / $scope.pageSize);
        });
    };
	
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.listdatamasterdata.length / $scope.pageSize);
    };
	///=======02-JAN-2018=============
	
	$scope.getproductdetails=function(){
		$http({
            method: 'GET',
			url: 'http://localhost:8327/api/getformproductdetails/' , 
			dataType: 'jsonp'
        }).then(function (response) {
            $scope.getproductdetailsdata = response.data;
			console.log($scope.getproductdetailsdata);
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
	//$scope.storedresult=[];
	$scope.listbigdatamaster = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/listbigdatamaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listbigdatamasterdata = response.data;
			console.log($scope.listbigdatamasterdata[0].dataid);
			//$scope.getreschedule($scope.listbigdatamasterdata[0].dataid);
        });
    };
	
	$scope.getreschedule = function (dataid) {
		console.log(dataid);
        $http({
            method: 'GET',
            url: 'http://localhost:8327/api/getreschedule/'+dataid,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getrescheduledata = response.data;
			console.log($scope.getrescheduledata);
			$scope.getrescheduledata[0].rescheduletodate=new Date($scope.getrescheduledata[0].rescheduletodate);
			console.log($scope.getrescheduledata);
			console.log($scope.getrescheduledata[0].rescheduletodate);
			//$scope.getrescheduledata = $scope.getrescheduledata[0];
			//$scope.getrescheduledata[0].time=new Date($scope.getrescheduledata[0].time);
			console.log($scope.getrescheduledata.length);
        });
    };
	
	
	$scope.getdatamaster = function(){
		
		$http({
            method: 'POST',
            url: '/api/datamaster/',
            data: $scope.mailingdata,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
			 $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Data unSuccessfully');
                    $window.location.reload();
                } else {
                    alert('Data Successfully');
                    $window.location.reload();
                }
        })
		
    };
	
	
	
	///======05-JAN-2018=============
	var socket = io();

	//$scope.add=[];
	socket.on('serverEvent', function(data){
		console.log(data);
		if($scope.myinterval){
			$interval.cancel($scope.myinterval);
		}
		
		if(data){
			$scope.minutes = 1;
			$scope.seconds = 59;
			$scope.startTimer($scope.minutes,$scope.seconds);
			console.log(data.dataid)
			$scope.datamasteradd=data;
			$scope.getformdetails(data.dataid);
			$window.sessionStorage.data=JSON.stringify(data);
		}else{
			alert("No Data Available in the Pool ");
			$scope.datamasteradd="";
		}
	});
	
	$scope.startTimer = function(min, sec) {
		$scope.min=min;
		$scope.sec=sec;
		$scope.myinterval=$interval(function() {
			if($scope.min!=0&&$scope.sec==1){
				$scope.min=$scope.min-1;
				$scope.sec=60;
			}
			
			sessionStorage['minutes']=$scope.min;
			sessionStorage['seconds']=$scope.sec;
			
			if($scope.min<=0&&$scope.sec<=1){
				sessionStorage.removeItem('minutes');
				sessionStorage.removeItem('seconds');
				socket.emit('adddata',$scope.datamasteradd);
				console.log($scope.datamasteradd)
				//$scope.getformdetails($scope.datamasteradd.dataid);
				$scope.callonload();
				$scope.getproductdetails();
				$interval.cancel(myinterval);
			} 
			//console.log($scope.myinterval);
			$scope.sec=$scope.sec-1;
			//console.log($scope.sec);
		}, 1000);
		
	}

	$scope.callonload = function() {
		if($scope.myinterval){
			$interval.cancel($scope.myinterval);
			
		}
		
		if(sessionStorage['minutes']||sessionStorage['seconds']){
			console.log("1");
			$scope.startTimer(sessionStorage['minutes'],sessionStorage['seconds']);
			var datastring=sessionStorage['data']
			 dataid=sessionStorage["dataid"]
			console.log(datastring);
			console.log(datastring.dataid);
			//$scope.getformdetails(dataid);
			$scope.datamasteradd=JSON.parse(datastring);
			console.log($scope.datamasteradd);
			$scope.getformdetails($scope.datamasteradd.dataid);
		}else{
			var notifydata=[];
			notifydata.push({"userid":sessionStorage['userid'],"usertype":sessionStorage['usertype']});
			socket.emit('clientEvent',notifydata);
		}
	};
	
	$scope.leadupdate=function(){
		if($scope.datamasteradd.status!="Ringing" || $scope.datamasteradd.status!=null ){
			//alert("hiiiii");
			if($scope.getformdetailsdata.length==0 || $scope.getformdetailsdata.length==undefined ){
			$scope.datamasteradd.detaileddata=$scope.getproductdetailsdata;
			}else if($scope.getformdetailsdata.length>0){
			$scope.datamasteradd.detaileddata=$scope.getformdetailsdata;
			}
			console.log($scope.datamasteradd.detaileddata);
			datetime = new Date($scope.datamasteradd.rescheduletime);
        var hours = datetime.getHours() > 12 ? datetime.getHours() - 12 : datetime.getHours();
        var am_pm = datetime.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var seconds = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
		$scope.datamasteradd.rescheduletime = time;
		console.log($scope.datamasteradd)
			 $http({
				method: 'POST',
				url: '/api/leadupdate/',
				data: $scope.datamasteradd,
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function (data) {
				alert(data.message);
				if(data.status==0){
					var notifydata=[];
					notifydata.push({"userid":sessionStorage['userid'],"usertype":sessionStorage['usertype']});
					socket.emit('clientEvent',notifydata);
				}
			}) 
		}else{
			socket.emit('adddata',$scope.datamasteradd);
			var notifydata=[];
			notifydata.push({"userid":sessionStorage['userid'],"usertype":sessionStorage['usertype']});
			socket.emit('clientEvent',notifydata);
		}
	}

});