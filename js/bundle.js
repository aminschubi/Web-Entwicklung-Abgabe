(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function Client(){

};
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
var DetailedView = require("./detailedView");
var ListView = require("./listView");
var Sitzung = require("./sitzung");

var detailedView = new DetailedView();
var listView = new ListView();

testSitzung = new Sitzung("Berlin", "08-06-2017", ["Neptun", "Mars"]);

listView.addSitzung(testSitzung);
detailedView.open(testSitzung);


},{"./detailedView":2,"./listView":3,"./sitzung":5}],5:[function(require,module,exports){
function Sitzung(ort, datum, objekte){
    this.ort = ort;
    this.datum = datum;
    this.objekte = objekte;
    this.description = "Ort: "+ort+" Datum: "+datum;
};

Sitzung.prototype.print = function(){

};

module.exports = Sitzung;
},{}]},{},[4,1,2,3,5]);
