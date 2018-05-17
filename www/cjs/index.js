var indexApp = angular.module('indexApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
indexApp.controller('indexController', function ($scope, $http, $window) {
	$scope.usertype=sessionStorage['usertype'];
	
	if(sessionStorage['emailid1']){
		$scope.useremail=sessionStorage['emailid1'];
	}
	
	$scope.submitForm = function() {
		$http({
			method: 'POST',
			url: '/api/user/auth/',
			data: $scope.user,
			headers : {'Content-Type': 'application/json'} 
		})
		.success(function(data) {
			if (!data.success) {
				alert(data.message);
				$scope.errormMessage = data.message;
			}      
			else {
				alert(data.message);
				$window.sessionStorage["emailid1"] = data.useremail;
				//$window.sessionStorage["username"] = data.username;
				$window.sessionStorage["userid"] = data.userid;
				$window.sessionStorage["usertype"] = data.usertype;
				
				location.href=data.page;
			}
        });
    };
	
	//    FORGOT PASSWORD
    
    $scope.verifyuser = function (usercheck) {
		$http({
			method: 'GET', 
			url: '/api/userduplicatecheck/' + usercheck, 
			dataType: 'jsonp'
		}).then(function (response) {
			$scope.uservalidity = response.data;
			if ($scope.uservalidity.length === 0) {
				$scope.dispuserduplicate1 = "User Does Not Exists";
				var element = $window.document.getElementById("Username");
				if (element) {
					element.focus();
				}
			}
			else {
				$scope.dispuserduplicate1 = "";
			}
		});
    };
	
    $scope.verifyemail = function (usercheck,email) {
        $http({
            method: 'GET'
            , url: '/api/emailduplicatecheck/' + usercheck +'/'+email
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.uservalidity = response.data;
            console.log($scope.uservalidity.length);
            if ($scope.uservalidity.length < 1) {
                 $scope.dispnoemail = "Username and Email ID Combination Does Not Exists";
                    var element = $window.document.getElementById("email");
                    if (element) {
                        element.focus();
                    }
                     
                }
                else {
                  
                    $scope.dispnoemail = "";
                }
            
        });
    };
    
    $scope.submitForgetpwd = function () {
        $http({
              method: 'POST'
              , url: '/api/user/forgetpwd/'
              , data: $scope.user
              , headers: {
                  'Content-Type': 'application/json'
              }
        }).then(function (response) {
            console.log(response.data);
            if (response.data.length > 0) {
                alert('Password has been sent to your registered Email ID.');
            }
        });
    };
     
    $scope.GetUserDetails = function()
    {
        $scope.username = $window.sessionStorage["username"];
        $scope.username=$scope.username.replace(/\"/g,""); 
		$scope.userid = $window.sessionStorage["userid"];
        $http({
            method: 'GET', 
			url: '/api/GetUserDetails/' + $scope.userid, 
			dataType: 'jsonp'
        }).then(function (response) {
              $scope.UserData = response.data;
        });  
	};
      
    //    RESET PASSWORD
	$scope.verifyOldpassword = function(){
		$http({
			method  : 'GET',
			url     : 'http://localhost:8325/api/userpasswdcheck/'+$scope.user.oldpassw+'/'+$scope.useremail,
			headers : {'Content-Type': 'application/json'} 
		}).success(function(data) { 
			if (data.length<1) {
				$scope.dispoldpwsswrng = "Incorrect Password";
				var element = $window.document.getElementById("oldpassw");
				if(element)
				{element.focus();}
				document.getElementById('newpass').disabled=true;
				document.getElementById('conpass').disabled=true;
			}
			else{
				
				$scope.dispoldpwsswrng="";
				document.getElementById('newpass').disabled=false;
				document.getElementById('conpass').disabled=false;
			}
		});
	};

    $scope.verifypasswequal = function(){
		if ($scope.user.newpassw !== $scope.user.verifynewpassw) {
			$scope.dispnewpasswrng = "New and Confirm Passwords doesn’t match";
		}
		else{
			$scope.dispnewpasswrng="";
			document.getElementById('update').disabled=false;
		}
	};
    
    $scope.submitpwdreset = function(){
		$scope.user.username=$scope.useremail;
		$http({
			method  : 'POST',
			url     : 'http://localhost:8325/api/updateresetpassw/',
			data    : $scope.user,
			headers : {'Content-Type': 'application/json'} 
		})
		.success(function(data) {
			alert(data.message)
			$scope.user="";
			location.reload();
		});
	};

//-------------show password

	function show() {
		var p = document.getElementById('pwd');
		p.setAttribute('type', 'text');
	}

	function hide() {
		var p = document.getElementById('pwd');
		p.setAttribute('type', 'password');
	}

	var pwShown = 0;

	var e1=document.getElementById("eye");
	if(e1)
	{
		e1.addEventListener("click", function () {
			if (pwShown == 0) {
				pwShown = 1;
			   show();
			} else {
				pwShown = 0;
				hide();
			}
		}, false);  
	}
      
});