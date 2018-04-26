app.controller('registerCtrl', function ($scope,$location ,professionService, $sce, $log, serviceProvidersService) {

    $scope.uploadedFile = "";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.selectedProfession = "";
    $scope.queryProfession = "";
    $scope.phoneNumber = "";
    $scope.email = "";    

    $scope.professionResults = [];

    $scope.pwdType = "password";
    $scope.iconClassType = "fa-eye";

    $scope.showPassword = false;

    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;

        if($scope.showPassword){
            $scope.pwdType = "text";
            $scope.iconClassType = "fa-eye-slash";
        }else{
            $scope.pwdType = "password";
            $scope.iconClassType = "fa-eye";
        }
    };

    professionService.loadAllOccupations();

    $scope.searchProfessionChange = function () {
        if ($scope.queryProfession) {
            $scope.professionResults = professionService.allOccupations;
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
        $scope.queryProfession = profession;
        $scope.professionResults = [];
    };



    $scope.register = function () {

        serviceProvidersService.load().then(() => {
            serviceProvidersService.add(
                serviceProvidersService.serviceProviders.length+1,
                $scope.firstName,
                $scope.lastName,
                $scope.uploadedFile,
                $scope.phoneNumber,
                $scope.email,
                $scope.selectedProfession,
                $scope.password).then(
                () => {
                    $location.path("/register/result");
                },
                (err) => {
                    $log.error("Error loading service providers");
                });
        });
    };
});