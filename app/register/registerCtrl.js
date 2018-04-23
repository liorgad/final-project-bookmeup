app.controller('registerCtrl', function ($scope, professionService, $sce, $log) {

    $scope.uploadedFile = "";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.selectedProfession = "";
    $scope.queryProfession = "";
    $scope.phoneNumber = "";
    $scope.email = "";
    $scope.pwd = "";

    $scope.pwdConfirm = "";
    $scope.professionResults = [];

    $scope.params = {};

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
        alert('Yey !!!');
    };


});