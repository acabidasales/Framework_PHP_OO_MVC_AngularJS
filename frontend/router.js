var app = angular.module('framework_PHP_OO_MVC_AngularJS', ['ngRoute', 'toastr', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "controller_home",
            resolve: {
                tipo: function(services) {
                    return services.get('home', 'tipo_carousel');
                },
                marca: function(services) {
                    return services.get('home', 'marcas_carousel');
                },
                /* categoria: function(services) {
                    return services.get('home', 'categoria_carousel');
                } */
            }
        }).when("/shop", {
            templateUrl: "frontend/module/shop/view/shop.html",
            controller: "controller_shop",
            resolve: {
                filters: function(services) {
                    return services.get('shop', 'filters');
                },
                list: function(services) {
                    return services.get('shop', 'list')
                },
                marcas: function(services) {
                    return services.get('shop', 'select_marcas')
                },
                combustible: function(services) {
                    return services.get('shop', 'select_combustible')
                }
            }
        }).when("/coche/:id", {
            templateUrl: "frontend/module/shop/view/shop.html",
            controller: "controller_shop",
            resolve: {
                filters: function() {},
                list: function() {},
                marcas: function() {},
                combustible: function() {}
            }

        }).when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "controller_contact"
        }).when("/login", {
            templateUrl: "frontend/module/login/view/login.html",
            controller: "controller_login"
        }).when("/logout", {
            templateUrl: "frontend/module/login/view/login.html",
            controller: "controller_login"
        }).when("/register", {
            templateUrl: "frontend/module/login/view/login.html",
            controller: "controller_login"
        }).when("/verify/:token", {
            templateUrl: "frontend/module/login/view/login.html",
            controller: "controller_login"
        }).when("/recover", {
            templateUrl: "frontend/module/login/view/login.html",
            controller: "controller_login"
        }).when("/recover/:token", {
            templateUrl: "frontend/module/login/view/login.html",
            controller: "controller_login"
        }).when("/cart", {
            templateUrl: "frontend/module/cart/view/cart.html",
            controller: "controller_cart",
            resolve: {
                list_products: function(services) {
                    return services.post('cart', 'load_cart', { token: localStorage.token });
                }
            }
        }).otherwise("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "controller_home",
            resolve: {
                /* tipo: function(services) {
                    return services.get('home', 'tipo_carousel');
                }, */
                marcas: function(services) {
                    return services.get('home', 'marcas_carousel');
                },
                /* categoria: function(services) {
                    return services.get('home', 'categoria_carousel');
                } */
            }
        });
}]);

app.run(function($rootScope, services, services_search) {
    if (localStorage.token) {
        $rootScope.menu = true;
    } else {
        $rootScope.menu = false;
    }

    services_search.search_marca();
    services_search.search_modelo();

    $rootScope.click_modelo = function(marca) {
        services_search.search_modelo(marca);
    }

    $rootScope.click_autocomplete = function(marca = undefined, modelo = undefined, autocomplete) {
        services_search.search_autocomplete(marca, modelo, autocomplete);
    }

    $rootScope.click_search = function(marca = undefined, modelo = undefined, autocomplete = undefined) {
        services_search.search(marca, modelo, autocomplete);
    }
});