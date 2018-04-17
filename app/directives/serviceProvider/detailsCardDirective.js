app.directive('detailsCard', function() {
    return {
        templateUrl: 'app/directives/serviceProvider/detailsCard.html',
        controller: 'detailsCardCtrl',
        restrict : "EAC"
    };
});