app.factory('services_login', ['services', 'services_localstorage', '$rootScope', 'toastr', function(services, services_localstorage, $rootScope, toastr) {
    let service = {login: login, logout: logout, register: register, verify_email:verify_email, recover_password:recover_password, new_password:new_password};
    return service;
    
    function login(username, password) {
        services.post('login', 'login', {username:username, password:password})
        .then(function(response) {
            if(response != "fail") {
                toastr.success("Log In");
                services_localstorage.setSession(response);
            }else {
                toastr.error("This account doesn't exist.");
            }
            location.href = "#/home";
            window.location.reload();
            return;
        }, function(error) {
            console.log(error);
        });
    }

    function logout() { 
        services_localstorage.clearSession();
        location.href = "#/home/";
        window.location.reload();
    }

    function register(username, email, password) {
        services.post('login', 'register', {username:username, email:email, password:password})
        .then(function(response) {
            $rootScope.token = response;
            location.href = "#/login";
            return;
        }, function(error) {
            console.log(error);
        });
    }

    function verify_email(token) {
        services.post('login', 'verify_email', {token:token})
        .then(function(response) {
            $rootScope.token = response;
            location.href = "#/login ";
            return;
        }, function(error) {
            console.log(error);
        });
    }

    function recover_password(email) {
        services.post('login', 'send_recover_email', {email:email})
        .then(function(response) {
            $rootScope.token = response;
            location.href = "#/login ";
            return;
        }, function(error) {
            console.log(error);
        });
    }

    function new_password(token, password) {
        services.post('login', 'new_password', {token:token, password:password})
        .then(function(response) {
            $rootScope.token = response;
            location.href = "#/login ";
            return;
        }, function(error) {
            console.log(error);
        });
    }

}]);