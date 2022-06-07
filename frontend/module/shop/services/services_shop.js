app.factory('services_shop', ['services', '$rootScope', function(services, $rootScope) {
    let service = {
        details: details,
        filter_search: filter_search,
        remove_localstorage: remove_localstorage,
        load_likes: load_likes,
        add_likes: add_likes
    };
    return service;

    function filter_search(filters) {
        services.post('shop', 'filters', { filters: filters })
            .then(function(cars) {
                localStorage.setItem('filters', JSON.stringify(filters));
                $rootScope.lists = cars;
                load_likes();
            }, function(error) {
                console.log(error);
            });
    }

    function remove_localstorage(item) {
        localStorage.removeItem(item);
        location.reload();
    }

    /* function pagination(cars , likes ) {

        console.log(cars);
        $rootScope.page = 1;
        $rootScope.total_page = Math.ceil(products.length / 6);
        $rootScope.pages = [];
        for (i = 1; i <= $rootScope.total_page; i++) {
            $rootScope.pages.push(i);
        }
        change_page($rootScope.page, likes);
    } */

    /* function change_page(page, favs) {
        console.log("change page");
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

    function load_likes() {
        if (localStorage.token) {
            services.post('shop', 'load_like', { username: localStorage.token })
                .then(function(response) {
                    for (row in $rootScope.lists) {
                        $rootScope.lists[row].like_class = "bx-heart";
                        var car = $rootScope.lists[row];
                        for (row in response) {
                            if (response[row].ID_car == car.ID) {
                                car.like_class = "bxs-heart";
                            };
                        }
                        /* $rootScope.lists[row].like_class = car.like_class; */
                    }
                }, function(error) {
                    console.log(error);
                });
        } else {
            for (row in $rootScope.lists) {
                $rootScope.lists[row].like_class = "no-heart";
            }
        }
    }

    function details(codigo_coche) {
        services.post('shop', 'select_details', { ID: codigo_coche })
            .then(function(response) {
                console.log(response);
                $rootScope.details = response;
                load_likes();
            }, function(error) {
                console.log(error);
            });
    }

    /* function load_api() {
        services.get_api("https://www.googleapis.com/books/v1/volumes?q=subject:sneakers", 'GET', 'JSON')
            .then(function(result) {
                $rootScope.api_content = result;
            }, function() {
                console.log("error api");
            });
    } */

    /* function add_cart(codigo_producto, user) {
        services.post('shop', 'insert_cart', { id: codigo_producto, user: user })
            .then(function(response) {
                console.log(response);
            }, function(error) {
                console.log(error);
            });
    } */

    function add_likes(id_coche, user) {
        services.post('shop', 'click_like', { id: id_coche, user: user })
            .then(function(response) {
                console.log(response);
            }, function(error) {
                console.log(error);
            });
    }

}]);