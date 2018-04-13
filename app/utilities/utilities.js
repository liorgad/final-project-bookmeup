Array.prototype.clear = function() {
    if(this.length != 0){this.splice(0,this.length);}
};

String.prototype.indifferentIncludes = function(str){
    return this.toLowerCase().includes(str.toLowerCase());
};


String.prototype.toTitleCase = function()
{
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};