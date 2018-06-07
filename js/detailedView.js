var Sitzung = require("./sitzung");

function DetailedView(){
    var this_ = this;
    this.backup = new Sitzung("","",[]);
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
    this.bSaveSit.onclick = this.save;
    this.bCloseSit.onclick = function(){this_.closeD();};

    this.offeneSitzung = 0;
};

DetailedView.prototype.open = function(sitzung){
    this.offeneSitzung = sitzung;
    this.backup = Object.create(this.offeneSitzung);
    this.tOrt.value = sitzung.ort;
    this.tDatum.value = sitzung.datum;
    for(let x in sitzung.objekte){
        var newObj = document.createElement("option");
        newObj.text = sitzung.objekte[x];
        this.list.add(newObj);
    }
};
DetailedView.prototype.editSitzung = function(){
    this.bNewObj.disabled = false;
    this.bDelObj.disabled = false;
    this.bEditObj.disabled = false;
    this.bSaveSit.disabled = false;
};
DetailedView.prototype.newBeObj = function(){
    var this_ = this;
    var objekt = window.prompt("Namen des zu beobachtenden Objekts:", "");
    if(objekt == null || objekt == ""){
        alert("Nichts wurde eingetippt!");
    }
    else{
        this_.offeneSitzung.objekte.push(objekt);
        var newObj = document.createElement("option");
        newObj.text = objekt;
        console.log(newObj);
        this_.list.add(newObj);
        console.log(this_.offeneSitzung);
        console.log(this_.backup);
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
    this.offeneSitzung = new Sitzung("","",[]);
    console.log(this.offeneSitzung);
    this.tDatum.value = "";
    this.tOrt.value = "";
    this.bNewObj.disabled = true;
    this.bDelObj.disabled = true;
    this.bEditObj.disabled = true;
    this.bSaveSit = true;
};
DetailedView.prototype.save = function(){
    this.backup.ort = this.offeneSitzung.ort;
    this.backup.datum = this.offeneSitzung.datum;
    this.backup.objekte = this.offeneSitzung.objekte;
};
DetailedView.prototype.print = function(){};

module.exports = DetailedView;

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}