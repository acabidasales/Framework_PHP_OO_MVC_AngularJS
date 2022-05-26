app.factory('services_shop', ['services', '$rootScope', function(services, $rootScope) {
    let service = {
        details: details,
        load_api: load_api,
        filter_search: filter_search,
        pagination: pagination,
        change_page: change_page,
        add_cart: add_cart,
        add_favs: add_favs
    };
    return service;

    function filter_search(filters) {
        console.log(filters);
        services.post('shop', 'list_filters_products', { filters: filters })
            .then(function(response) {
                pagination(response);
            }, function(error) {
                console.log(error);
            });
    }

    /* function pagination(products, favs) {
        $rootScope.products = products;
        $rootScope.page = 1;
        $rootScope.total_page = Math.ceil(products.length / 6);
        $rootScope.pages = [];
        for (i = 1; i <= $rootScope.total_page; i++) {
            $rootScope.pages.push(i);
        }
        change_page($rootScope.page, favs);
    } */

    /* function change_page(page, favs) {
        $rootScope.show1 = true;
        $rootScope.show2 = true;

        $rootScope.current_page = page;
        $rootScope.list_products = $rootScope.products.slice((($rootScope.current_page - 1) * 6), (($rootScope.current_page) * 6));
        if (page >= $rootScope.total_page) {
            $rootScope.show2 = false;
        }
        if (page <= 1) {
            $rootScope.show1 = false;
        }
        load_favs();
    } */

    /* function load_favs() {
        if (localStorage.token) {
            services.post('shop', 'load_like', { user: localStorage.token })
                .then(function(response) {
                    for (row in $rootScope.list_products) {
                        $rootScope.list_products[row].favs_class = "bx-heart";
                        var product = $rootScope.list_products[row];
                        for (row in response) {
                            if (response[row].codigo_producto == product.codigo_producto) {
                                product.favs_class = "bxs-heart";
                            };
                        }
                        $rootScope.list_products[row].favs_class = product.favs_class;
                    }
                }, function(error) {
                    console.log(error);
                });
        } else {
            for (row in $rootScope.list_products) {
                $rootScope.list_products[row].favs_class = "bx-heart";
            }
        }
    } */

    function details(codigo_coche) {
        services.post('shop', 'details', { codigo_coche: codigo_coche })
            .then(function(response) {
                $rootScope.list = response;
                /* load_favs();
                load_api(); */
            }, function(error) {
                console.log(error);
            });
    }

    function load_api() {
        services.get_api("https://www.googleapis.com/books/v1/volumes?q=subject:sneakers", 'GET', 'JSON')
            .then(function(result) {
                $rootScope.api_content = result;
            }, function() {
                console.log("error api");
            });
    }

    /* function add_cart(codigo_producto, user) {
        services.post('shop', 'insert_cart', { id: codigo_producto, user: user })
            .then(function(response) {
                console.log(response);
            }, function(error) {
                console.log(error);
            });
    } */

    /* function add_favs(codigo_producto, user) {
        services.post('shop', 'click_like', { id: codigo_producto, user: user })
            .then(function(response) {
                console.log(response);
            }, function(error) {
                console.log(error);
            });
    } */

}]);