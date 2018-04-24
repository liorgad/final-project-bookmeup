app.factory("serviceProvidersService", function ($q, $log, $http) {

    function ServiceProvider(id, fname, lname, image, phone, email, profession, password) {
        this.id = id;
        this.fname = fname.toTitleCase();
        this.lname = lname.toTitleCase();

        // this.imageURL = (image == undefined || image == null || image == "") ? '../../images/img_avatar3.png' : image;

        this.imageURL =image;
        this.phone = phone;
        this.email = email;
        this.occupation = profession;
        this.password = password;
        this.occupiedTime = [];
        this.getFullName = function () {
            return String(this.fname + " " + this.lname).toTitleCase();
        };

        this.getImage= ()=>{
            if(this.imageURL){
                return this.imageURL;
            }
            return  '../../images/img_avatar3.png';
        };
    }

    // ServiceProvider.prototype.fromServerObject = function(spObject){
    //     this.id = spObject.id;
    //     this.fname =spObject.fname;
    //     this.lname = spObject.lname;
    //     this.imageURL = spObject.imageURL;
    //     this.phone = spObject.phone;
    //     this.cellPhone =spObject.cellPhone;
    //     this.email =spObject.email ;      
    //     this.occupation = spObject.data.occupation;
    //     this.address = spObject.data.buisness-address;
    //     this.occupiedTime = spObject.data.occupied-time;  
    // };

    var isLoaded = false;
    var serviceProviders = [];

    function load() {
        var async = $q.defer();

        if (!isLoaded) {

            $http.get("https://liorgad-my-cool-project.herokuapp.com/service-providers").then(
                (response) => {
                    $log.debug(response);
                    serviceProviders.clear();
                    response.data.forEach((element) => {
                        serviceProviders.push(new ServiceProvider(element.id, element.fname, element.lname, element.imageURL, element.phone,
                            element.email, element.occupation, element.password));
                    });
                    isLoaded = true;
                    async.resolve();
                },
                (err) => {
                    $log.error("Error getting service providers " + err);
                    async.reject();
                });
        }else{
            async.resolve();
        }

        return async.promise;

    }

    function add(id, fname, lname, image, phone, email, profession, password) {
        var async = $q.defer();

        var sp = new ServiceProvider(id, fname, lname, image, phone, email, profession, password);

        $http.post("https://liorgad-my-cool-project.herokuapp.com/service-providers", JSON.stringify(sp))
            .then((req, res) => {
                $log.debug("Added " + JSON.stringify(sp) + " " + res);
                serviceProviders.push(sp);
                async.resolve();
            }, (err) => {
                $log.error("Error adding service provider " + JSON.stringify(sp));
                async.reject();
            });
        return async.promise;
    }

    return {
        serviceProviders: serviceProviders,
        add: add,
        load: load,
        isLoaded: isLoaded
    };
});