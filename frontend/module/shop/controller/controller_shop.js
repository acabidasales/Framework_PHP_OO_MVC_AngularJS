app.controller('controller_shop', function($scope, $rootScope, $route, filters, list, marcas, combustible, services_shop) {
    let nombre_marca = [];
    let nombre_combustible = [];

    $scope.filter_products = function(brand_values, type_values) {
        var filter_type = [];

        if (brand_values) {
            if (!nombre_marca.includes(brand_values)) {
                nombre_marca.push(brand_values);
            } else {
                i = nombre_marca.indexOf(brand_values);
                nombre_marca.splice(i, 1);
            }
        }
        if (type_values) {
            if (!nombre_combustible.includes(type_values)) {
                nombre_combustible.push(type_values);
            } else {
                i = nombre_combustible.indexOf(type_values);
                nombre_combustible.splice(i, 1);
            }
        }

        if (nombre_marca.length != 0) {
            filter_type.push({ key: 'Marca', value: nombre_marca });
        }
        if (nombre_combustible.length != 0) {
            filter_type.push({ key: 'Tipo', value: nombre_combustible });
        }
        if (filter_type.length == 0) {
            /* $scope.pagination(list); */
        } else {

            services_shop.filter_search(filter_type);
            location.href = "#/home";
            location.href = "#/shop";

        }
    }

    /* $scope.pagination = function(products) {
        services_shop.pagination(products);
    } */

    /* $scope.change_page = function(page) {
        services_shop.change_page(page);
    } */

    $scope.remove_filters = function() {
        services_shop.remove_localstorage('filters');
    }

    $scope.load_details = function(id) {
        location.href = "#/coche/" + id;
    };

    /* $scope.add_cart = function(codigo_producto) {
        if (localStorage.token) {
            services_shop.add_cart(codigo_producto, localStorage.token);
        } else {
            location.href = "#/login";
        }
    } */

    $scope.add_like = function() {
        if (localStorage.token) {
            services_shop.add_likes(this.list.ID, localStorage.token);
            if (this.list.like_class == "bxs-heart") {
                this.list.like_class = "bx-heart";
            } else {
                this.list.like_class = "bxs-heart";
            }
        } else {
            location.href = "#/login";
        }
    }

    let path = $route.current.originalPath.split('/');
    if (path[1] === 'shop') {
        $scope.filters = filters;
        $scope.show_list_cars = true;
        $scope.show_filters = true;
        $scope.show_list = true;
        $scope.show_details = false;
        if (localStorage.getItem('filters')) {
            var local = JSON.parse(localStorage.filters);
            /* localStorage.removeItem('filters'); */
            $scope.marcas = marcas;
            $scope.combustibles = combustible;
            services_shop.filter_search(local);
            $scope.show_red_button = true;
        } else {

            $scope.marcas = marcas;
            $scope.combustibles = combustible;
            $rootScope.lists = list;
            services_shop.load_likes();
        }
    } else if (path[1] === 'coche') {
        $scope.show_list_cars = false;
        $scope.show_filters = false;
        $scope.show_list = false;
        $scope.show_details = true;
        services_shop.details($route.current.params.id);
    }
});