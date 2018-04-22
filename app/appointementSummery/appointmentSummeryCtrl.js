app.controller("appointmentSummeryCtrl", function ($scope, $location, $log,appointementService) {
    $log.debug(JSON.stringify(appointementService.getTempAppopintement));
});