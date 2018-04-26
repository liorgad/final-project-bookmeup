app.controller("bookServiceCtrl", function ($scope, $location, $routeParams, serviceProvidersService, $log,appointementService) {

     $scope.customerFirstName="";
     $scope.customerLastName="";
     $scope.customerEmail="";
     $scope.customerPhone="";
     $scope.customerAddress="";
     $scope.customerMessage="";
     $scope.selectedDate =  new Date();

    var selectedProviderId = parseInt($routeParams.serviceProviderId);

    var spData = serviceProvidersService.getProvider(selectedProviderId);

    $scope.serviceProvider = spData;

    if (undefined == spData || null == spData) {
        $log.warn("Warning, service provider " + selectedProviderId + " data not found");
        return;
    }    

    $scope.createAppointmentSummery= function(){

        var customer = {
            firstName : $scope.customerFirstName.toTitleCase(),
            lastName: $scope.customerLastName.toTitleCase(),
            email : $scope.customerEmail,
            phone : $scope.customerPhone,
            address : $scope.customerAddress,
            message : $scope.customerMessage            
        };

        appointementService.setTempAppointement($scope.serviceProvider,customer);

        $location.path("/bookService/"+$scope.serviceProvider.id+"/summery");        
    };

});
