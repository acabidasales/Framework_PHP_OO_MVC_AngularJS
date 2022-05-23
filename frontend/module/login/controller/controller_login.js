app.controller('controller_login', function($scope, $route, $rootScope, services, services_login, services_social_login, toastr) {
    $scope.regex_username = /^[A-Za-z0-9._-]{5,15}$/;
    $scope.regex_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $scope.regex_password = /^[A-Za-z0-9._-]{5,20}$/;

    if (!$rootScope.ini_social_login) {
        $rootScope.ini_social_login = 0;
    }
    if ($rootScope.ini_social_login == 0) {
        services_social_login.initialize();
        $rootScope.ini_social_login = 1;
    }
    
    $scope.login = function(){
        services_login.login($scope.username, $scope.password); 
    }

    $scope.login_google = function() {
        services_social_login.google();
    };

    $scope.login_github = function() {
        services_social_login.github();
    };

    $scope.register = function(){
        services_login.register($scope.register_username, $scope.register_email, $scope.register_password);
    }

    $scope.recover_password = function(){
        if($scope.email != undefined){
            services_login.recover_password($scope.email);
        }
    }

    $scope.new_password = function(){
        if($scope.password != undefined){
            console.log($scope.password);
            services_login.new_password($route.current.params.token, $scope.password);
        }
    }

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'login'){
        $scope.show_login = true;
        $scope.show_register, $scope.show_recover_password, $scope.show_new_password = false;
    }else if(path[1] === 'logout'){
        services_login.logout();
    }else if(path[1] === 'register'){
        $scope.show_register = true;
        $scope.show_login, $scope.show_recover_password, $scope.show_new_password = false;
    }else if (path[1] === 'verify') {
        services_login.verify_email($route.current.params.token);
    }else if(path[1] === 'recover'){
        if($route.current.params.token){
            $scope.show_new_password = true;
            $scope.show_register, $scope.show_login, $scope.show_recover_password = false;
        }else{
            $scope.show_recover_password = true;
            $scope.show_register, $scope.show_login, $scope.show_new_password = false;
        }
    } 

});
