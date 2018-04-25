app.factory("customerService", function ($log, $q,$http) {

    function Customer(id,fname, lname, email, phone, address, message, appt) {
        this.id = id;
        this.firstName = fname.toTitleCase();
        this.lastName = lname.toTitleCase();
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.message = message;
        this.appointments = [];
        this.appointments.push(appt);
    }

    let customersList = [];

    function load(){
        var async = $q.defer();

        $http.get("https://liorgad-my-cool-project.herokuapp.com/customers")
            .then((res) => {
                $log.debug("loaded customers " + res);
                res.data.forEach(c => customersList.push(c));
                async.resolve();
            }, (err) => {
                $log.error("Error loading customers");
                async.reject();
            });
        return async.promise;
    }
    
    function addCustomer(fname, lname, email, phone, address, message, appt){
        var async = $q.defer();

        if(customersList){
            let c = new Customer(customersList.length+1,fname, lname, email, phone, address, message, appt);

            $http.post("https://liorgad-my-cool-project.herokuapp.com/customers",JSON.stringify(c))
            .then((req, res) => {
                $log.debug("add customer " + res);
                customersList.push(c);
                async.resolve();
            }, (err) => {
                $log.error("Error adding customers");
                async.reject();
            });
        }else{
        async.reject();
        }
        return async.promise;
    }


    return {
        load :load,
        addCustomer :addCustomer
    };
});