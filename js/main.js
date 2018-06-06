var DetailedView = require("./detailedView");
var ListView = require("./listView");
var Sitzung = require("./sitzung");

var detailedView = new DetailedView();
var listView = new ListView();

testSitzung = new Sitzung("Berlin", "08-06-2017", ["Neptun", "Mars"]);

listView.addSitzung(testSitzung);
detailedView.open(testSitzung);

