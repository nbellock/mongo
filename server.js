//dependencies
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

//initialize Express app
var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(process.cwd() + "/public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//connecting to MongoDB
mongoose.connect("mongodb://heroku_rx2bjrd1:v3mta9fv4cmsq66enussc2b35q@ds227352.mlab.com:27352/heroku_rx2bjrd1");

// var url = process.env.MONGOLAB_URI
// if (!url) {
//     mongoose.connect("mongodb://localhost/");
// } else {
//     // mongoose.connect("mongodb://localhost/");
//     mongoose.connect(url);
// }



var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to Mongoose!")
});

var routes = require("./controller/controller.js");
app.use("/", routes);

// var port = process.env.PORT || 3001;
// app.listen(port, function () {
//     console.log("Listening on PORT " + port);
// });

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});