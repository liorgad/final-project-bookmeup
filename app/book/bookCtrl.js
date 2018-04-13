app.controller("bookCtrl", function ($scope, professionService,$sce,serviceProvidersService) {
    $scope.test = "bla";
    $scope.professionResults = [];
    $scope.serviceProviders = [];
    $scope.selectedProfession ="";

    professionService.load();

    $scope.searchProfessionChange = function () {
        if ($scope.queryProfession) {
            $scope.professionResults = professionService.professions;
        }else{
            $scope.professionResults =[];
        }
    };

    // highlight seatched text
    $scope.highlight = function(text, search) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };

    // filters results
    $scope.filterProfession = function(prof){
        return prof.indifferentIncludes($scope.queryProfession);
    };


    // a profession was selected, loading relevant service providers
    $scope.selectProfession = function (profession) {
        $scope.selectedProfession = profession;
        serviceProvidersService.load().then(()=>{            //successful load             
            $scope.serviceProviders = serviceProvidersService.serviceProviders.filter( (v) => {return v.occupation === $scope.selectedProfession;});
            $scope.queryProfession = "";
            $scope.professionResults =[];
        });

    };

    $scope.openDetails = function(serviceProvider){

    };
});