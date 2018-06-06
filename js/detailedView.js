function DetailedView(){
    //TextAreas
    this.tOrt = document.getElementById("ort");
    this.tDatum = document.getElementById("datum");
    //Buttons
    this.bOpenMaps = document.getElementById("openMaps");
    console.log(this.bOpenMaps);
    this.bNewObj = document.getElementById("newObj");
    this.bEditObj = document.getElementById("editObj");
    this.bDelObj = document.getElementById("delObj");
    this.bPrintSit = document.getElementById("printSit");
    this.bSaveSit = document.getElementById("saveSit");
    this.bCloseSit = document.getElementById("closeSit");
    //SelectArea
    this.list = document.getElementById("liste");
    //OnClicks
    this.bOpenMaps.onclick = this.openLocation;
    this.bNewObj.onclick = this.newBeObj;
    this.bEditObj.onclick = this.editBeObj;
    this.bDelObj.onclick = this.delBeObj;
    this.bPrintSit.onclick = this.print;
    this.bSaveSit.onclick = this.save;
    this.bCloseSit.onclick = this.close;

    this.offeneSitzung = 0;
};

DetailedView.prototype.open = function(sitzung){
    this.offeneSitzung = sitzung;
    this.tOrt.value = sitzung.ort;
    this.tDatum.value = sitzung.datum;
    for(let x in sitzung.objekte){
        var newObj = document.createElement("option");
        newObj.text = sitzung.objekte[x];
        this.list.add(newObj);
    }
};
DetailedView.prototype.editSitzung = function(){};
DetailedView.prototype.newBeObj = function(objekt){};
DetailedView.prototype.editBeObj = function(){};
DetailedView.prototype.delBeObj = function(){};
DetailedView.prototype.openLocation = function(){
    console.log("test");
};
DetailedView.prototype.close = function(){};
DetailedView.prototype.save = function(){};
DetailedView.prototype.print = function(){};

module.exports = DetailedView;