app.controller('controller_cart', function($scope, list_products, services_cart) {
    $scope.list_products = list_products;
    
    $scope.remove_cart = function(codigo_producto){
        if(localStorage.token){
            services_cart.remove_cart(codigo_producto, localStorage.token);
        }else{
            location.href = "#/login";
        }   
    }   

    $scope.change_qty = function(codigo_producto){
        services_cart.change_qty(codigo_producto, $scope.list_products.qty, localStorage.token);
    }   

    $scope.checkout = function(){
        services_cart.checkout(localStorage.token);
    }   

    $scope.subtotal = function(){
        let total = 0;
        for (row in $scope.list_products) {
            total += ($scope.list_products[row].precio * $scope.list_products[row].qty);
        }
        return total;
    }   

});