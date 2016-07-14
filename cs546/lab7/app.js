const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require("./routes");

const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');

/*
const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
    extname: '.handlebars'
});
*/

app.use("/public", static);
app.use(bodyParser.json());

//app.engine('handlebars', handlebarsInstance.engine);
let hbd_settings = {
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        },
        niceDate: (date_str) => {
            //input=Mon Jul 04 2016 00:00:00 GMT-0400 (EDT)
            let date = new Date(date_str);
            return date.toLocaleDateString();
        }
    },
    extname: '.handlebars'
};
app.engine('handlebars', exphbs(hbd_settings));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(8080, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:8080");
});
