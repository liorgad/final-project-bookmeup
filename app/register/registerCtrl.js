app.controller('registerCtrl', function ($scope,$location ,professionService, $sce, $log, serviceProvidersService) {

    $scope.uploadedFile = "";
    $scope.firstName = "test";
    $scope.lastName = "test";
    $scope.selectedProfession = "dentist";
    $scope.queryProfession = "";
    $scope.phoneNumber = "00000";
    $scope.email = "me@me.me.me";
    $scope.pwd = "123456";

    $scope.professionResults = [];


    $scope.showPassword = false;

    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;
    };

    professionService.load();

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