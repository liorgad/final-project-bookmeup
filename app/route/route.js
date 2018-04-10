//@ts-check
app.config(function ($routeProvider, $locationProvider) {

    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('');

    $routeProvider
        .when("/", {
            templateUrl: "index.html"//,
            //controller: "coverCtrl"
        })        
        .otherwise({
            redirectTo: "/"
        });
});