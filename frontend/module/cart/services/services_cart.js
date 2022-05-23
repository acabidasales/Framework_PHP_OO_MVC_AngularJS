app.factory('services_cart', ['services', '$rootScope', function(services, $rootScope) {
    let service = {remove_cart: remove_cart, change_qty: change_qty, checkout: checkout};
    return service;

    function remove_cart(codigo_producto, token) {
        $rootScope.details_product = token;
        services.post('cart', 'delete_cart', {codigo_producto: codigo_producto, user: token})
        .then(function(response) {
            location.href = "#/cart/";
            return;
        }, function(error) {
            console.log(error);
        });
    }

    function change_qty(codigo_producto, qty, token) {
        $rootScope.details_product = codigo_producto;
        services.post('cart', 'update_qty', {id: codigo_producto, user: token, qty: qty})
        .then(function(response) {
            location.href = "#/cart/";
            return;
        }, function(error) {
            console.log(error);
        });
    }

    function checkout(token) {
        services.post('cart', 'checkout', {user: token})
        .then(function(response) {
            if(response != "fail") {
                toastr.success("Check out");
                services_localstorage.setSession(response);
            }else {
                toastr.error("Doesn't checkout");
            }
            location.href = "#/home";
            return;
        }, function(error) {
            console.log(error);
        });
    }
    
}]);