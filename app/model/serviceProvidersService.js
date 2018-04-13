app.factory("serviceProvidersService",function($q,$log,$http){

    function ServiceProvider(id,fname,lname,image,phone,cellPhone,email,profession,address){
        this.id = id;
        this.fname =fname;
        this.lname = lname;

        this.imageURL = (image == undefined || image == null || image == "")? '../../images/img_avatar3.png' : image;
        
        
        this.phone = phone;
        this.cellPhone =cellPhone;
        this.email =email ;        
        this.occupation = profession;
        this.address = address;
        this.occupiedTime = [];  
        this.getFullName = function(){return String(this.fname + " " + this.lname).toTitleCase();};
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

    var serviceProviders = [];

    function load(){
        var async =$q.defer();
        
        $http.get("http://localhost:3000/service-providers").then(            
        (response)=>{
            $log.debug(response);
            serviceProviders.clear();
            response.data.forEach((element) =>{
                serviceProviders.push(new ServiceProvider(element.id,element.fname,element.lname,element.imageURL,element.phone,
                element.cellPhone,element.email,element.occupation,element.address));
            });
            async.resolve();
        },
        (err)=> {
            $log.error("Error getting service providers "+err);
            async.reject();
        });


        return async.promise;        
    }

    function add(fname,lname,image,phone,cellPhone,email,profession,address){
        var async =$q.defer();

        var newId = serviceProviders.length;
        var sp = new ServiceProvider(newId,lname,image,phone,cellPhone,email,profession,address);
        
        $http.post("http://localhost:3000/service-providers",JSON.stringify(sp)
        .then((req,res)=>{
            $log.debug("Added " + JSON.stringify(sp) + " " + res);
            serviceProviders.push(sp);
            async.resolve();
        },(err)=>{
            $log.error("Error adding service provider " + JSON.stringify(sp));
            async.reject();
        }));    
        return async.promise;        
    }

    return{
        serviceProviders : serviceProviders,
        add : add,
        load : load
    };
});