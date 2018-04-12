app.controller("landingPageCtrl",function($scope,$location){
    $scope.book = function(){
        $location.path("/book");
    };
});