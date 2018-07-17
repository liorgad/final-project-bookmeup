app.factory("professionService", function ($http, $log,$q,serviceProvidersService) {
    var isLoaded = false,isAllLoaded = false;
    var occupations =[];
    var allOccupations = [];

    function loadAllOccupations(){
        var async = $q.defer();

        if (!isAllLoaded) {
            $http.get("https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/occupations.json").then(function (response) {
                //on success
                $log.debug(response);
                allOccupations.clear();
                response.data.occupations.forEach(element => {
                    allOccupations.push(element.toTitleCase());
                });
                $log.debug(allOccupations);
                isAllLoaded = true;
                async.resolve(allOccupations);
    
            }, function (response) {
                //on error
                $log.erorr("Error loading professions list " + response);
                async.reject();
            });
        }
        else{
            if(allOccupations){
                async.resolve(allOccupations);
            }
        }
        return async.promise;
    }

    function load(){
        var async = $q.defer();

        if (!isLoaded) {

            serviceProvidersService.load().then(
                function (response) {
                    //on success
                    $log.debug(response);
                    occupations.clear(); 
                    let ocp = [];
                    response.forEach(element => {
                        if(element.occupation){
                            ocp.push(element.occupation.toTitleCase());
                        }                        
                    });
                    var uniqueArr = ocp.filter( (value, index, self) => { 
                        return self.indexOf(value) === index;
                    });

                    uniqueArr.forEach(element => {
                        if(element){
                            occupations.push(element);
                        }                        
                    });

                    $log.debug(occupations);
                    isLoaded = true;
                    async.resolve();
        
                }, function (response) {
                    //on error
                    $log.erorr("Error loading professions list " + response);
                    async.reject();
                }
            );            
        }
        else{
            $log.debug('Occupations preloaded: ' + JSON.stringify(occupations));
            async.resolve();
        }

        return async.promise;
    }

    return {
        load : load,
        professions : occupations,
        loadAllOccupations : loadAllOccupations,
        allOccupations : allOccupations
    };
});