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
        .when("/about", {
            templateUrl: "app/about/about.html"            
        })
        .when("/register", {
            templateUrl: "app/register/register.html",
            controller: "registerCtrl"
        })
        .when("/contact", {
            templateUrl: "app/contact/contact.html"            
        })
        .when("/register/result", {
            templateUrl: "app/registerResult/result.html",
            controller: "registerCtrl"
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