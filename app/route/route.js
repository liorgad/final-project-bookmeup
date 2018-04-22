app.config(function ($routeProvider, $locationProvider) {

    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('');

    $routeProvider
        .when("/", {
            templateUrl: "app/landingPage/landingPage.html",
            controller: "landingPageCtrl"
        })  
        .when("/book", {
            templateUrl: "app/book/book.html",
            controller: "bookCtrl"
        })
        .when("/bookService/:serviceProviderId",{
            templateUrl : "app/bookService/bookService.html",
            controller : "bookServiceCtrl"
        })
        .when("/bookService/:serviceProviderId/summery",{
            templateUrl : "app/appointementSummery/appointmentSummery.html",
            controller : "appointmentSummeryCtrl"
        })      
        .otherwise({
            redirectTo: "/"
        });
});