app.controller('controller_shop', function($scope, $rootScope, $route, filters, list, services_shop, marca, combustible) {
    /* let marcas = [];
    let combustible = []; */
    $scope.lists = list;
    $scope.marcas = marca;
    $scope.combustibles = combustible

    /* $scope.filter_products = function(value, key) {
        var fliter_type = [];

        if (key == "marcas") {
            if (!marcas.includes(value)) {
                marcas.push(value);
            } else {
                i = marcas.indexOf(value);
                marcas.splice(i, 1);
            }
        } else if (key == "combustible") {
            if (!combustible.includes(value)) {
                combustible.push(value);
            } else {
                i = combustible.indexOf(value);
                combustible.splice(i, 1);
            }
        }

        if (marcas.length != 0) {
            fliter_type.push({ key: 'marcas', value: marcas });
        }
        if (combustible.length != 0) {
            fliter_type.push({ key: 'combustible', value: combustible });
        }

        if (fliter_type.length == 0) {
            $scope.pagination(list);
        } else {
            services_shop.filter_search(fliter_type);
        }
    } */

    /* $scope.pagination = function(products) {
        services_shop.pagination(products);
    } */

    /* $scope.change_page = function(page) {
        services_shop.change_page(page);
    } */

    $scope.load_details = function(codigo_producto) {
        location.href = "#/product/" + codigo_producto;
    };

    $scope.add_cart = function(codigo_producto) {
        if (localStorage.token) {
            services_shop.add_cart(codigo_producto, localStorage.token);
        } else {
            location.href = "#/login";
        }
    }

    $scope.add_like = function() {
        if (localStorage.token) {
            services_shop.add_like(this.product.codigo_producto, localStorage.token);
            if (this.product.like_class == "bxs-heart") {
                this.product.like_class = "bx-heart";
            } else {
                this.product.like_class = "bxs-heart";
            }
        } else {
            location.href = "#/login";
        }
    }

    let path = $route.current.originalPath.split('/');
    if (path[1] === 'shop') {
        $scope.filters = filters;
        $scope.show_list_product = true;
        $scope.show_details = false;
        if (localStorage.filters) {
            var local = JSON.parse(localStorage.filters);
            localStorage.removeItem('filters');
            services_shop.filter_search(local);
        } else {
            /* $scope.pagination(list); */
        }
    } else if (path[1] === 'product') {
        $scope.show_list_product = false;
        $scope.show_details = true;
        services_shop.details($route.current.params.token);
    }
});