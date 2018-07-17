app.controller("landingPageCtrl",function($scope,$location,professionService){

    professionService.load();

    $scope.book = function(){
        $location.path("/book");
    };
});