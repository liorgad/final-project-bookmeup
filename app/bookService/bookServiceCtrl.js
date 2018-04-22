app.controller("bookServiceCtrl", function ($scope, $location, $routeParams, serviceProvidersService, $log,appointementService) {

     $scope.customerFirstName="test";
     $scope.customerLastName="test";
     $scope.customerEmail="test";
     $scope.customerPhone="test";
     $scope.customerAddress="test";
     $scope.customerMessage="test";

    var selectedProviderId = parseInt($routeParams.serviceProviderId);

    var spData = serviceProvidersService.serviceProviders.find((e) => e.id == selectedProviderId);

    $scope.serviceProvider = spData;

    if (undefined == spData || null == spData) {
        $log.warn("Warning, service provider " + selectedProviderId + " data not found");
        return;
    }
    
    

    $scope.createAppointmentSummery= function(){

        var customer = {
            firstName : $scope.customerFirstName,
            lastName: $scope.customerLastName,
            email : $scope.customerEmail,
            phone : $scope.customerPhone,
            address : $scope.customerAddress,
            message : $scope.customerMessage
        };
    
        var start = moment().date();
        var end = start;
        var date = {
            start : start,
            end : end
        }; 

        appointementService.setTempAppointement($scope.serviceProvider,customer,date);

        $location.path("/bookService/"+$scope.serviceProvider.id+"/summery");        
    };

});
