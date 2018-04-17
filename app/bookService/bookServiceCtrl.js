app.controller("bookServiceCtrl",function($scope,$location,$routeParams,serviceProvidersService,$log){

    var selectedProviderId = parseInt($routeParams.serviceProviderId);

    var spData = serviceProvidersService.serviceProviders.find( (e) => e.id==selectedProviderId);

    $scope.serviceProvider = spData;

    if(undefined ==spData || null == spData ){
        $log.warn("Warning, service provider " + selectedProviderId + " data not found");
        return;
    }

});