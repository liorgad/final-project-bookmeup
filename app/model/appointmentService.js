app.factory("appointementService", function ($log, $q,$http) {

    function Appointement(serviceProivder, customer, date) {
        this.serviceProivder = serviceProivder;
        this.customer = customer;
        this.date = date;
    }

    function Time(time) {
        this.date = new Date(time.date);
        this.start = time.start;
        this.end = this.start + 1;
        this.available = time.available;
    }

    let tempAppt = new Appointement();

    function setTempAppointement(serviceProivder, customer) {

        tempAppt.serviceProvider = serviceProivder;
        tempAppt.customer = customer;        
        //tempAppt.date = date;
    }

    function getTempAppopintement() {
        // let tApt = JSON.parse(localStorage.tempAppt);
        // return tApt;
        return tempAppt;
    }

    function updateAppointment(appt) {
        // let tApt = JSON.parse(localStorage.tempAppt);
        // appt.serviceProvider =tApt.serviceProvider;
        // appt.date = tApt.date;
        // appt.customer = tApt.customer;        
        appt.serviceProvider = tempAppt.serviceProvider;
        appt.date = tempAppt.date;
        appt.customer = tempAppt.customer;
    }

    function setTempTime(time) {
        tempAppt.date = new Time(time);
    }

    function addAppointement(){
        var async = $q.defer();        

        $http.post("https://liorgad-my-cool-project.herokuapp.com/appointments", JSON.stringify(tempAppt))
            .then((req, res) => {
                $log.debug("Added " + JSON.stringify(tempAppt) + " " + res);
                tempAppt = new Appointement();
                async.resolve();
            }, (err) => {
                $log.error("Error adding Appointment " + JSON.stringify(tempAppt));
                async.reject();
            });
        return async.promise;
    }


    return {
        setTempAppointement: setTempAppointement,
        getTempAppopintement: getTempAppopintement,
        updateAppointment: updateAppointment,
        setTempTime: setTempTime,
        addAppointement : addAppointement
    };
});