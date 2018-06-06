function ListView(details){
    var this_ = this;
    this.details = details;
    this.sitzungen = [];
    this.bNextPage = document.getElementById("nextPage");
    this.bNextPage.onclick = function(){
        this_.sitzungen = [];
        this_.clean();
    };
    this.list = document.getElementById("sitzungen");
    this.list.onchange = function(){
        this_.details.close();
        this_.details.open(this_.sitzungen[this_.list.selectedIndex]);
    };
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
    this.clean();
    for(let x in this.sitzungen){
        var newObj = document.createElement("option");
        newObj.text = this.sitzungen[x].description;
        this.list.add(newObj);
    }
};
ListView.prototype.clean = function(){
    for(i = this.list.options.length - 1 ; i >= 0 ; i--)
        {
            this.list.remove(i);
        }
};

module.exports = ListView;