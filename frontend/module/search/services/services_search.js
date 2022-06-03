app.factory('services_search', ['services', '$rootScope', function(services, $rootScope) {
    let service = {
        search_marca: search_marca,
        search_modelo: search_modelo,
        search_autocomplete: search_autocomplete,
        search: search
    };
    return service;

    function search_marca() {
        services.post('search', 'marca')
            .then(function(response) {
                $rootScope.marcas_search = response;
            }, function(error) {
                console.log(error);
            });
    }

    function search_modelo(marca = undefined) {
        services.post('search', 'modelo', { marca: marca })
            .then(function(response) {
                $rootScope.modelos_search = response;
            }, function(error) {
                console.log(error);
            });
    }

    function search_autocomplete(marca = undefined, modelo = undefined, autocomplete) {
        if (autocomplete != "") {
            services.post('search', 'autocomplete', { marca: marca, modelo: modelo, complete: autocomplete })
                .then(function(response) {
                    console.log(response);
                    $rootScope.complete = response;
                }, function(error) {
                    console.log(error);
                });
        } else {
            $rootScope.complete = [];
        }
    }

    function search(marca = undefined, modelo = undefined, complete) {
        if (marca || modelo || complete != undefined && complete != "") {
            var filters = [];
        }

        if (marca) {
            filters.push({ key: "marca", value: [marca] });
        }
        if (modelo) {
            filters.push({ key: "modelo", value: [modelo] });
        }
        if (complete != undefined && complete != "") {
            filters.push({ key: "complete", value: complete });
        }

        if (filters) {
            localStorage.setItem("filters", JSON.stringify(filters));
            location.href = "#/shop/";
        }
    }

}]);