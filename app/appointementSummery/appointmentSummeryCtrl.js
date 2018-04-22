app.controller("appointmentSummeryCtrl", function ($scope, $location, $log,appointementService) {
    $scope.appointment = {};
    
    appointementService.updateAppointment($scope.appointment);

});