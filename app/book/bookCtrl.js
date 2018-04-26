app.controller("bookCtrl", function ($timeout, $q, $location, $log, $scope, professionService, $sce, serviceProvidersService) {

    $scope.professionResults = [];
    $scope.serviceProviders = [];
    $scope.selectedProfession = "";

    professionService.load().then(()=>{
        $scope.professionResults = professionService.professions;
    });

    $scope.searchProfessionChange = function () {
        if ($scope.queryProfession) {
            $scope.professionResults = professionService.professions;
        } else {
            $scope.professionResults = [];
        }
    };

    // highlight seatched text
    $scope.highlight = function (text, search) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };

    // filters results
    $scope.filterProfession = function (prof) {
        return prof.indifferentIncludes($scope.queryProfession);
    };


    // a profession was selected, loading relevant service providers
    $scope.selectProfession = function (profession) {
        $scope.selectedProfession = profession;
        serviceProvidersService.load().then(() => { //successful load             
            $scope.serviceProviders = serviceProvidersService.serviceProviders.filter((v) => {
                if (v.occupation) {
                    return v.occupation.indifferentIncludes($scope.selectedProfession);
                }
                return false;
            }); 
            $scope.queryProfession = profession;           
            $scope.professionResults = [];
        });

    };

    $scope.openDetails = function (serviceProvider) {
        $scope.queryProfession = "";
        $location.path("/bookService/" + serviceProvider.id);
    };

    // $scope.keyPress = function (event) {
    //     switch (event.key) {
    //         case 'ArrowDown':
    //             alert('arrowDown');
    //             break;
    //         case 'ArrowUp':
    //             alert('arrowUp');
    //             break;
    //         case 'Enter':
    //             break;
    //         default:
    //             $log.debug(event.key);
    //             break;
    //     }
    // };
});