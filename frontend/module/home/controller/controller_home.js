app.controller('controller_home', function($scope, $window, /*  carousel, */ marca, tipo) {
    let loaded = 3;
    /* let total = brands.length; */

    /* $scope.slides = carousel; */
    $scope.marcas = marca;
    $scope.tipos = tipo;
    /* $scope.brands = brands.slice(0, loaded); */


    /*
      cont=3;
      $scope.slides = categories.slice(0,2);
      $scope.cats = categories.slice(0, cont);

      $scope.showMore = function() {
          cont=cont+3;
          $scope.cats = categories.slice(0, cont);
          if (cont>$scope.cats.length) {
              angular.element('#show_more').remove();
          }

      };
    */

    $scope.redirect_shop = function(key, value) {
        var filters = [];
        filters.push({ key: key, value: [value] });
        localStorage.removeItem('filters');
        localStorage.setItem('filters', JSON.stringify(filters));
        location.href = "#/shop";
    };

});