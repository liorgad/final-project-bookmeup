app.factory("appointementService", function ($log,$q) {
    
    function Appointement(serviceProivder,customer,date){
        this.serviceProivder = serviceProivder;
        this.customer = customer;
        this.date = date;
    }


    let tempAppt = {};    

    function setTempAppointement(serviceProivder,customer,date){
        
        tempAppt.serviceProvider = serviceProivder;
        tempAppt.customer = customer;
        tempAppt.date = date;           
    }

    function getTempAppopintement(){
        // let tApt = JSON.parse(localStorage.tempAppt);
        // return tApt;
        return tempAppt;
    }

    function updateAppointment(appt){
        // let tApt = JSON.parse(localStorage.tempAppt);
        // appt.serviceProvider =tApt.serviceProvider;
        // appt.date = tApt.date;
        // appt.customer = tApt.customer;        
        appt.serviceProvider =tempAppt.serviceProvider;
        appt.date = tempAppt.date;
        appt.customer = tempAppt.customer;
    }


    return {        
        setTempAppointement : setTempAppointement,
        getTempAppopintement: getTempAppopintement,
        updateAppointment: updateAppointment
    };
});