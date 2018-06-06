function DetailedView(){
    //TextAreas
    this.tOrt = document.getElementById("ort");
    this.tDatum = document.getElementById("datum");
    //Buttons
    this.bOpenMaps = document.getElementById("openMaps");
    this.bNewObj = document.getElementById("newObj");
    this.bEditObj = document.getElementById("editObj");
    this.bDelObj = document.getElementById("delObj");
    this.bPrintSit = document.getElementById("printSit");
    this.bSaveSit = document.getElementById("saveSit");
    this.bCloseSit = document.getElementById("closeSit");
    //OnClicks
    this.bNewObj.onclick = this.newBeObj;
    this.bEditObj.onclick = this.editBeObj;
    this.bDelObj.onclick = this.delBeObj;
    this.bPrintSit.onclick = this.print;
    this.bSaveSit.onclick = this.save;
    this.bCloseSit.onclick = this.close;

    this.offeneSitzung = 0;
    this.open = function(sitzung){
        this.offeneSitzung = sitzung;
    };
    this.editSitzung = function(){};
    this.newBeObj = function(objekt){};
    this.editBeObj = function(){};
    this.delBeObj = function(){};
    this.openLocation = function(){};
    this.close = function(){};
    this.save = function(){};
    this.print = function(){};
};