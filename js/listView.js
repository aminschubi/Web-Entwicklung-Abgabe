function ListView(){
    this.sitzungen = [];
    this.list = document.getElementById("sitzungen");
};

ListView.prototype.addSitzung = function(sitzung){
    this.sitzungen.push(sitzung);
    this.update();
};
ListView.prototype.delSitzung = function(index){
    this.sitzungen.splice(index, index);
    this.update();
};
ListView.prototype.update = function(){
    for(let x in this.sitzungen){
        var newObj = document.createElement("option");
        newObj.text = this.sitzungen[x].description;
        this.list.add(newObj);
    }
}

module.exports = ListView;