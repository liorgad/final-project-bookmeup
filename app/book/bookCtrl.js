//@ts-check
app.controller("bookCtrl", function ($scope, professionService,$sce) {
    $scope.test = "bla";
    $scope.professionResults = [];

    professionService.load();

    $scope.searchProfessionChange = function () {
        if ($scope.queryProfession) {
            $scope.professionResults = professionService.professions;
        }else{
            $scope.professionResults =[];
        }
    };

    $scope.highlight = function(text, search) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };

    $scope.filterProfession = function(prof){
        return prof.indifferentIncludes($scope.queryProfession);
    };

    $scope.selectProfession = function (result) {

    };
});