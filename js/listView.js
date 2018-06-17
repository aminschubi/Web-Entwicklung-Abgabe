var Sitzung = require("./sitzung");
var json = require("../dummy.json");

function ListView(details){
    var this_ = this;
    this.details = details;
    this.details.listView = this;
    this.sitzungen = [];
    this.bAdd = document.getElementById("addSitzung");
    this.bAdd.onclick = function(){this_.newSitzung();};
    this.bNextPage = document.getElementById("nextPage");
    this.bNextPage.onclick = function(){
        this_.sitzungen = [];
        this_.clean();
    };
    this.list = document.getElementById("sitzungen");
    this.list.onchange = function(){
        this_.details.closeD();
        this_.details.open(this_.sitzungen[this_.list.selectedIndex]);
        this_.details.bEditSit.diabled = false;
    };
    this.list.onclick = function(){
        this_.details.closeD();
        this_.details.open(this_.sitzungen[this_.list.selectedIndex]);
        this_.details.bEditSit.diabled = false;
    };
    this.read();
};

ListView.prototype.newSitzung = function(){
    this.details.closeD();
    var neu = new Sitzung("","",[]);
    this.addSitzung(neu);
    this.update();
    this.list.selectedIndex = this.sitzungen.length-1;

};
ListView.prototype.addSitzung = function(sitzung){
    this.sitzungen.push(sitzung);
    var test = JSON.stringify(sitzung);
    console.log(test);
    this.update();
};
ListView.prototype.delSitzung = function (index){
	this.sitzungen.splice(index, index);
	this.update();
};
ListView.prototype.update = function () {
	this.clean();
	for (let x in this.sitzungen) {
		var newObj = document.createElement("option");
		newObj.text = this.sitzungen[x].getDesc();
		this.list.add(newObj);
	}
};
ListView.prototype.clean = function () {
    if(this.list != undefined)
        for (var i = this.list.options.length - 1; i >= 0; i--) {
            this.list.remove(i);
        }
};
ListView.prototype.read = function(){
    var jSitzungen = json.sitzungen;
    for(let x in jSitzungen){
        this.addSitzung(new Sitzung(jSitzungen[x].ort, jSitzungen[x].datum, jSitzungen[x].objekte));
    }
    console.log(this.sitzungen);
}

module.exports = ListView;
