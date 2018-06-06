function ListView(){
    this.sitzungen = [];
    this.addSitzung = function(sitzung){
        this.sitzungen.push(sitzung);
    };
    this.delSitzung = function(index){
        this.sitzungen.splice(index, index);
    };

};