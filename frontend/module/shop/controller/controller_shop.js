app.controller('controller_shop', function($scope, $rootScope, $route, filters, list, marcas, combustible, services_shop) {
    console.log("hola");
    /* let nombre_marca = [];
    let nombre_combustible = []; */
    $scope.lists = list;
    $scope.marcas = marcas;
    $scope.combustibles = combustible;

    $scope.filter_products = function(value, key) {
        var fliter_type = [];

        if (key == "marcas") {
            if (!nombre_marca.includes(value)) {
                nombre_marca.push(value);
            } else {
                i = nombre_marca.indexOf(value);
                nombre_marca.splice(i, 1);
            }
        } else if (key == "combustible") {
            if (!nombre_combustible.includes(value)) {
                nombre_combustible.push(value);
            } else {
                i = nombre_combustible.indexOf(value);
                nombre_combustible.splice(i, 1);
            }
        }

        if (nombre_marca.length != 0) {
            fliter_type.push({ key: 'marcas', value: nombre_marca });
        }
        if (nombre_combustible.length != 0) {
            fliter_type.push({ key: 'combustible', value: nombre_combustible });
        }

        if (fliter_type.length == 0) {
            /* $scope.pagination(list); */
        } else {
            services_shop.filter_search(fliter_type);
        }
    }

    /* $scope.pagination = function(products) {
        services_shop.pagination(products);
    } */

    /* $scope.change_page = function(page) {
        services_shop.change_page(page);
    } */

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

    /* $scope.add_like = function() {
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
    } */

    let path = $route.current.originalPath.split('/');
    console.log(path);
    if (path[1] === 'shop') {
        console.log("a");
        $scope.filters = filters;
        $scope.show_list_cars = true;
        $scope.filters = true;
        $scope.list = true;
        $scope.show_details = false;
        if (localStorage.filters) {
            var local = JSON.parse(localStorage.filters);
            localStorage.removeItem('filters');
            services_shop.filter_search(local);
        } else {
            /* $scope.pagination(list); */
        }
    } else if (path[1] === 'coche') {
        console.log("a");
        $scope.show_list_cars = false;
        $scope.filters = false;
        $scope.list = false;
        $scope.show_details = true;
        services_shop.details($route.current.params.id);
    }
});