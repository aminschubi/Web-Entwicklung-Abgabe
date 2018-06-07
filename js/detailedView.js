var Sitzung = require("./sitzung");

function DetailedView(){
    var this_ = this;
    this.listView = 0;
    this.refSitzung = 0;
    this.offeneSitzung = 0;
    this.backup = 0;
    //TextAreas
    this.tOrt = document.getElementById("ort");
    this.tDatum = document.getElementById("datum");
    //Buttons
    this.bOpenMaps = document.getElementById("openMaps");
    console.log(this.bOpenMaps);
    this.bNewObj = document.getElementById("newObj");
    this.bEditObj = document.getElementById("editObj");
    this.bDelObj = document.getElementById("delObj");
    this.bEditSit = document.getElementById("editSit");
    this.bPrintSit = document.getElementById("printSit");
    this.bSaveSit = document.getElementById("saveSit");
    this.bCloseSit = document.getElementById("closeSit");
    //SelectArea
    this.list = document.getElementById("liste");
    //OnClicks
    this.bOpenMaps.onclick = this.openLocation;
    this.bNewObj.onclick = function(){this_.newBeObj();};
    this.bEditObj.onclick = this.editBeObj;
    this.bDelObj.onclick = this.delBeObj;
    this.bEditSit.onclick = function(){this_.editSitzung();};
    this.bPrintSit.onclick = this.print;
    this.bSaveSit.onclick = function(){this_.save()};
    this.bCloseSit.onclick = function(){this_.closeD();};
};

DetailedView.prototype.open = function(sitzung){
    this.refSitzung = sitzung;
    this.offeneSitzung = new Sitzung(sitzung.getOrt(), sitzung.getDatum(), sitzung.getObjekte());
    this.backup = new Sitzung(sitzung.getOrt(), sitzung.getDatum(), sitzung.getObjekte().slice(0));
    this.tOrt.value = sitzung.ort;
    this.tDatum.value = sitzung.datum;
    for(let x in sitzung.objekte){
        var newObj = document.createElement("option");
        newObj.text = sitzung.objekte[x];
        this.list.add(newObj);
    }
};
DetailedView.prototype.editSitzung = function(){
    this.tOrt.disabled = false;
    this.tDatum.disabled = false;
    this.bNewObj.disabled = false;
    this.bDelObj.disabled = false;
    this.bEditObj.disabled = false;
    this.bSaveSit.disabled = false;
};
DetailedView.prototype.newBeObj = function(){
    var objekt = window.prompt("Namen des zu beobachtenden Objekts:", "");
    if(objekt == null || objekt == ""){
        alert("Nichts wurde eingetippt!");
    }
    else{
        this.offeneSitzung.objekte.push(objekt);
        var newObj = document.createElement("option");
        newObj.text = objekt;
        console.log(newObj);
        this.list.add(newObj);
    }
};
DetailedView.prototype.editBeObj = function(){};
DetailedView.prototype.delBeObj = function(){};
DetailedView.prototype.openLocation = function(){
    console.log("test");
};
DetailedView.prototype.closeD = function(){
    for(i = this.list.options.length - 1 ; i >= 0 ; i--)
    {
        this.list.remove(i);
    }
    console.log(this.offeneSitzung, this.backup);
    if(this.offeneSitzung != 0){
        //this.offeneSitzung = new Sitzung(this.backup.getOrt(), this.backup.getDatum(), this.backup.getObjekte().slice(0));
        console.log(this.offeneSitzung, this.backup);
    }
    this.tDatum.value = "";
    this.tOrt.value = "";
    this.bNewObj.disabled = true;
    this.bDelObj.disabled = true;
    this.bEditObj.disabled = true;
    this.bSaveSit = true;
    this.tOrt.disabled = true;
    this.tDatum.disabled = true;
};
DetailedView.prototype.save = function(){
    this.backup = new Sitzung(this.tOrt.value, this.tDatum.value, this.offeneSitzung.getObjekte().slice(0));
    this.refSitzung.ort = this.backup.getOrt();
    this.refSitzung.datum = this.backup.getDatum();
    this.refSitzung.objekte = this.backup.getObjekte().slice(0);
    this.listView.update();
};
DetailedView.prototype.print = function(){};

module.exports = DetailedView;