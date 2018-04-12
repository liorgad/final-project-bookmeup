Array.prototype.clear = function() {
    if(this.length != 0){this.splice(0,this.length);}
};

String.prototype.indifferentIncludes = function(str){
    return this.toLowerCase().includes(str.toLowerCase());
};