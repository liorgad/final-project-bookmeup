app.factory("professionService", function ($http, $log,$q) {
    var isLoaded = false;
    var occupations =[];

    function load(){
        var async = $q.defer();

        if (!isLoaded) {
            $http.get("https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/occupations.json").then(function (response) {
                //on success
                $log.debug(response);
                occupations.clear();
                response.data.occupations.forEach(element => {
                    occupations.push(element.toTitleCase());
                });
                $log.debug(occupations);
                isLoaded = true;
                async.resolve();
    
            }, function (response) {
                //on error
                $log.erorr("Error loading professions list " + response);
                async.reject();
            });
        }

        return async.promise;
    }

    return {
        load : load,
        professions : occupations
    };
});