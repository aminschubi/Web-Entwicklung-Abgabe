function Sitzung(ort, datum, objekte){
    this.ort = ort;
    this.datum = datum;
    this.objekte = objekte;
    this.description = "Ort: "+ort+" Datum: "+datum;
};

Sitzung.prototype.print = function(){

};

module.exports = Sitzung;