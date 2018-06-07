function Sitzung(ort, datum, objekte){
    this.ort = ort;
    this.datum = datum;
    this.objekte = objekte;
};

Sitzung.prototype.getOrt = function(){
    return this.ort;
};

Sitzung.prototype.getDatum = function(){
    return this.datum;
};

Sitzung.prototype.getObjekte = function(){
    return this.objekte;
};

Sitzung.prototype.getDesc = function(){
    return "Ort:"+this.ort+", Datum:"+this.datum;
};

module.exports = Sitzung;