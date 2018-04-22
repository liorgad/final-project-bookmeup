app.factory("appointementService", function ($log,$q) {
    
    function Appointement(serviceProivder,customer,date){
        this.serviceProivder = serviceProivder;
        this.customer = customer;
        this.date = date;
    }


    var tempAppt = {};    

    function setTempAppointement(serviceProivder,customer,date){
        
        tempAppt.serviceProvider = serviceProivder;
        tempAppt.customer = customer;
        tempAppt.date = date;   
        localStorage.tempAppt = JSON.stringify(tempAppt); 
    }

    function getTempAppopintement(){
        return localStorage.tempAppt;
    }


    return {        
        setTempAppointement : setTempAppointement,
        getTempAppopintement: getTempAppopintement 
    };
});