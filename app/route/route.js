//@ts-check
app.config(function ($routeProvider, $locationProvider) {

    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('');

    $routeProvider
        .when("/", {
            templateUrl: "app/landingPage/landingPage.html",
            controller: "landingPageCtrl"
        })        
        .otherwise({
            redirectTo: "/"
        });
});