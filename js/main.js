var DetailedView = require("./detailedView");
var ListView = require("./listView");
var Sitzung = require("./sitzung");

var detailedView = new DetailedView();
var listView = new ListView(detailedView);
console.log(listView);

listView.addSitzung(new Sitzung("Tokio", "08-06-2017", ["Saturn", "Venus"]));
listView.addSitzung(new Sitzung("Berlin", "08-06-2017", ["Neptun", "Mars"]));
listView.addSitzung(new Sitzung("Trier", "08-06-2017", ["Neptun", "Mars"]));



