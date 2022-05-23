app.factory('services_search', ['services', '$rootScope', function(services, $rootScope) {
    let service = {search_sexo: search_sexo, search_categoria: search_categoria, search_autocomplete:search_autocomplete, search: search};
    return service;

    function search_sexo() {
        services.post('search', 'sexo')
       .then(function(response) {
           $rootScope.sexo = response;
       }, function(error) {
            console.log(error);
       }); 
    }

    function search_categoria(sexo = undefined) {
        services.post('search', 'categoria', {sexo: sexo})
        .then(function(response) {
            $rootScope.categoria = response;
        }, function(error) {
            console.log(error);
        });
    }

    function search_autocomplete(sexo = undefined, categoria = undefined, autocomplete) {
        if(autocomplete != ""){
            services.post('search', 'autocomplete', {sexo: sexo, categoria: categoria, complete: autocomplete})
            .then(function(response) {
                $rootScope.complete = response;
            }, function(error) {
                console.log(error);
            });           
        }else{
            $rootScope.complete = [];
        }
    }

    function search(sexo = undefined, categoria = undefined, complete) {
        if(sexo || categoria || complete != undefined && complete != ""){
            var filters = [];
        }
        
        if(sexo){
            filters.push({key: "sexo", value: [sexo]});
        }
        if(categoria){
            filters.push({key: "categoria", value: [categoria]});
        }
        if(complete != undefined && complete != ""){ 
            filters.push({key: "nombre", value: complete});     
        }
       
        if(filters){
            localStorage.setItem("filters", JSON.stringify(filters));
            location.href = "#/shop/";
        }
    }
    
}]);