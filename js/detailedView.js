var Sitzung = require("./sitzung");

function DetailedView() {
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
	this.bNewObj.onclick = function () { this_.newBeObj(); };
	this.bEditObj.onclick = function () { this_.editBeObj(); };
	this.bDelObj.onclick = function () { this_.delBeObj(); };
	this.bEditSit.onclick = function () { this_.editSitzung(); };
	this.bPrintSit.onclick = this.print;
	this.bSaveSit.onclick = function () { this_.save(); };
	this.bCloseSit.onclick = function () { this_.closeD(); };
}

DetailedView.prototype.open = function (sitzung) {
	this.refSitzung = sitzung;
	this.offeneSitzung = new Sitzung(sitzung.getOrt(), sitzung.getDatum(), sitzung.getObjekte());
	this.backup = new Sitzung(sitzung.getOrt(), sitzung.getDatum(), sitzung.getObjekte().slice(0));
	this.tOrt.value = sitzung.ort;
	this.tDatum.value = sitzung.datum;
	for (let x in sitzung.objekte) {
		var newObj = document.createElement("option");
		newObj.text = sitzung.objekte[x];
		this.list.add(newObj);
	}
};
DetailedView.prototype.editSitzung = function () {
	this.tOrt.disabled = false;
	this.tDatum.disabled = false;
	this.bNewObj.disabled = false;
	this.bDelObj.disabled = false;
	this.bEditObj.disabled = false;
	this.bSaveSit.disabled = false;
};
DetailedView.prototype.newBeObj = function () {
	var objekt = window.prompt("Namen des zu beobachtenden Objekts:", "");
	if (objekt === null || objekt === "") {
		alert("Nichts wurde eingetippt!");
	}
	else {
		this.offeneSitzung.objekte.push(objekt);
		var newObj = document.createElement("option");
		newObj.text = objekt;
		console.log(newObj);
		this.list.add(newObj);
	}
};
DetailedView.prototype.editBeObj = function () {
	var objekt = window.prompt("Beobachtungsobjekt " + this.list.selectedIndex, "");
	if (objekt === null || objekt === "") {
		alert("Nichts wurde eingetippt!");
	}
	else {
		this.offeneSitzung.objekte[this.list.selectedIndex] = objekt;
		this.list.options[this.list.selectedIndex].text = objekt;
	}
};
DetailedView.prototype.delBeObj = function () {
	console.log("delete Element " + this.list.selectedIndex);
	if (this.list.selectedIndex >= 0) {
		this.offeneSitzung.objekte.splice(this.list.selectedIndex, 1);
		this.list.remove(this.list.selectedIndex);
	}
};
DetailedView.prototype.openLocation = function () {
	console.log("test");
};
DetailedView.prototype.closeD = function () {
	for (var i = this.list.options.length - 1; i >= 0; i--) {
		this.list.remove(i);
	}
	if (this.offeneSitzung !== 0) {
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
DetailedView.prototype.save = function () {
	this.backup = new Sitzung(this.tOrt.value, this.tDatum.value, this.offeneSitzung.getObjekte().slice(0));
	this.refSitzung.ort = this.backup.getOrt();
	this.refSitzung.datum = this.backup.getDatum();
	this.refSitzung.objekte = this.backup.getObjekte().slice(0);
	this.listView.update();
};
DetailedView.prototype.print = function () {};

module.exports = DetailedView;
