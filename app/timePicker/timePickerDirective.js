app.directive('timePicker', function() {
    return {
        templateUrl: 'app/timePicker/timePicker.html',
        controller: 'timePickerCtrl',
        restrict : "EAC"
    };
});