(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={"sitzungen" : [
    {"ort":"Tokio","datum":"08-06-2017","objekte":["Saturn","Venus"]},
    {"ort":"Tokio","datum":"08-06-2017","objekte":["Saturn","Venus"]},
    {"ort":"Tokio","datum":"08-06-2017","objekte":["Saturn","Venus"]}
]}

},{}],2:[function(require,module,exports){
function Client(){

};
},{}],3:[function(require,module,exports){
var Sitzung = require("./sitzung");

function DetailedView(){
    //lokales this für onclick()'s
    var this_ = this;
    //Ref auf Liste für updates
    this.listView = 0;
    //Ref auf Sitzung im Listen-Array
    this.refSitzung = 0;
    //Aktuell geöffnete Liste und Backup (Muss noch verschönert)
    this.offeneSitzung = 0;
    this.backup = 0;
    //TextAreas
    this.tOrt = document.getElementById("ort");
    this.tDatum = document.getElementById("datum");
    //Buttons
    this.bOpenMaps = document.getElementById("openMaps");
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
    this.bEditObj.onclick = function(){this_.editBeObj();};
    this.bDelObj.onclick = function(){this_.delBeObj();};
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
DetailedView.prototype.editBeObj = function(){
    var objekt = window.prompt("Beobachtungsobjekt "+this.list.selectedIndex, "");
    if(objekt == null || objekt == ""){
        alert("Nichts wurde eingetippt!");
    }
    else{
        this.offeneSitzung.objekte[this.list.selectedIndex] = objekt;
        this.list.options[this.list.selectedIndex].text = objekt;
    }
};
DetailedView.prototype.delBeObj = function(){
    console.log("delete Element "+this.list.selectedIndex);
    if(this.list.selectedIndex >= 0){
        this.offeneSitzung.objekte.splice(this.list.selectedIndex, 1);
        this.list.remove(this.list.selectedIndex);
    }
};
DetailedView.prototype.openLocation = function(){
    console.log("test");
};
DetailedView.prototype.closeD = function(){
    for(i = this.list.options.length - 1 ; i >= 0 ; i--)
    {
        this.list.remove(i);
    }
    if(this.offeneSitzung != 0){
        this.refSitzung.ort = this.backup.getOrt();
        this.refSitzung.datum = this.backup.getDatum();
        this.refSitzung.objekte = this.backup.getObjekte().slice(0);
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
},{"./sitzung":6}],4:[function(require,module,exports){
var Sitzung = require("./sitzung");
var json = require("../dummy.json");

function ListView(details){
    var this_ = this;
    this.details = details;
    this.details.listView = this;
    this.sitzungen = [];
    this.read();
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
ListView.prototype.delSitzung = function(index){
    this.sitzungen.splice(index, index);
    this.update();
};
ListView.prototype.update = function(){
    this.clean();
    for(let x in this.sitzungen){
        var newObj = document.createElement("option");
        newObj.text = this.sitzungen[x].getDesc();
        this.list.add(newObj);
    }
};
ListView.prototype.clean = function(){
    for(i = this.list.options.length - 1 ; i >= 0 ; i--)
        {
            this.list.remove(i);
        }
};
ListView.prototype.read = function(){
    var jSitzungen = json.sitzungen;
    for(let x in jSitzungen){
        this.sitzungen.push(new Sitzung(jSitzungen[x].ort, jSitzungen[x].datum, jSitzungen[x].objekte));
    }
    console.log(this.sitzungen);
}

module.exports = ListView;
},{"../dummy.json":1,"./sitzung":6}],5:[function(require,module,exports){
var DetailedView = require("./detailedView");
var ListView = require("./listView");
var Sitzung = require("./sitzung");

var detailedView = new DetailedView();
var listView = new ListView(detailedView);
console.log(listView);

listView.addSitzung(new Sitzung("Tokio", "08-06-2017", ["Saturn", "Venus"]));
listView.addSitzung(new Sitzung("Berlin", "08-06-2017", ["Neptun", "Mars"]));
listView.addSitzung(new Sitzung("Trier", "08-06-2017", ["Neptun", "Mars"]));




},{"./detailedView":3,"./listView":4,"./sitzung":6}],6:[function(require,module,exports){
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
},{}]},{},[2,3,4,6,5]);
