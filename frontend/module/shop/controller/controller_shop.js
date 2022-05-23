app.controller('controller_shop', function($scope, $rootScope, $route, filters, list_products, services_shop) {
    let talla = [];
    let color = [];
    let categoria = [];    

    $scope.filter_products = function(value, key) {
        var fliter_type = [];

        if(key == "talla"){
            if(!talla.includes(value)){
                talla.push(value);
            }else{
                i = talla.indexOf(value);
                talla.splice( i, 1 );
            }
        }else if(key == "color"){
            if(!color.includes(value)){
                color.push(value);
            }else{
                i = color.indexOf(value);
                color.splice( i, 1 );
            }
        }else if(key == "categoria"){
            if(!categoria.includes(value)){
                categoria.push(value);
            }else{
                i = categoria.indexOf(value);
                categoria.splice( i, 1 );
            }
        }

        if(talla.length != 0){
            fliter_type.push({key : 'talla', value : talla});
        }
        if(color.length != 0){
            fliter_type.push({key : 'color', value : color});
        }
        if(categoria.length != 0){
            fliter_type.push({key : 'categoria', value : categoria});
        }

        if(fliter_type.length == 0){
            $scope.pagination(list_products);
        }else{
            services_shop.filter_search(fliter_type);
        }
    }

    $scope.pagination = function(products) {
        services_shop.pagination(products);
    }

    $scope.change_page = function(page) {
        services_shop.change_page(page); 
    }

    $scope.load_details = function(codigo_producto) {
        location.href = "#/product/" + codigo_producto;
    };

    $scope.add_cart = function(codigo_producto) {
        if(localStorage.token){
            services_shop.add_cart(codigo_producto, localStorage.token);
        }else{
            location.href = "#/login";
        }
    }

    $scope.add_favs = function() {
        if(localStorage.token){
            services_shop.add_favs(this.product.codigo_producto, localStorage.token);
            if(this.product.favs_class == "bxs-heart"){
                this.product.favs_class = "bx-heart";
            }else{
                this.product.favs_class = "bxs-heart";
            }
        }else{
            location.href = "#/login";
        }
    }

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'shop'){
        $scope.filters = filters;
        $scope.show_list_product = true;
        $scope.show_details = false;
        if(localStorage.filters){
            var local = JSON.parse(localStorage.filters);
            localStorage.removeItem('filters');
            services_shop.filter_search(local);
        }else{
            $scope.pagination(list_products);
        }
    }else if(path[1] === 'product'){
        $scope.show_list_product = false;
        $scope.show_details = true;
        services_shop.details($route.current.params.token);
    }
});

