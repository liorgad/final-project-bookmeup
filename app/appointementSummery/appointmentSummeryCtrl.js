app.controller("appointmentSummeryCtrl", function ($scope, $location, $log, appointementService, serviceProvidersService, customerService) {
    $scope.appointment = {};

    appointementService.updateAppointment($scope.appointment);

    $scope.confirm = function() {
        serviceProvidersService.updateAppointment($scope.appointment.date).then(() => {
            appointementService.addAppointement().then(() => {
                customerService.load().then(() => {
                    customerService.addCustomer($scope.appointment.customer.firstName,
                        $scope.appointment.customer.lastName,
                        $scope.appointment.customer.email,
                        $scope.appointment.customer.phone,
                        $scope.appointment.customer.address,
                        $scope.appointment.customer.message,
                        $scope.appointment.date
                    ).then(() => {
                        $log.debug("Success adding appointement");
                        $scope.confirmResult = "Your Appointment has been sent to " + $scope.appointment.serviceProvider.getFullName();

                        let htmlMsg = $scope.appointment.customer.firstName + " " + $scope.appointment.customer.lastName + " has scheduled an appointment" +
                        " to " + $scope.appointment.customer.address +  "<br>" + "contact details: " + $scope.appointment.customer.email + " " + $scope.appointment.customer.phone +
                        "<br>messsage: "+$scope.appointment.customer.message + "<br>at: " + $scope.appointment.date.date.toDateString() + " " +$scope.appointment.date.date.toTimeString();
                        
                        var templateParams = {
                            service_provider_email : $scope.appointment.serviceProvider.email,
                            reply_to : $scope.appointment.customer.email,
                            message_html :htmlMsg,
                            customer_name : $scope.appointment.customer.firstName + " " + $scope.appointment.customer.lastName,
                            to_name :  $scope.appointment.serviceProvider.getFullName()                  
                        };
                         
                        emailjs.send('gmail', 'template_UJLlZpzE', templateParams)
                            .then(function(response) {
                               console.log('SUCCESS!', response.status, response.text);
                            }, function(error) {
                               console.log('FAILED...', error);
                            });
                    });
                });
            });
        });
    };
});