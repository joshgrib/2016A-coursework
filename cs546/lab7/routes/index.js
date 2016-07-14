const peopleRoutes = require("./people");
const eventRoutes = require("./events");
const locationRoutes = require("./locations");

const path = require('path');

const settings = require('../settings');

let peoplePath = settings.path + '/people';
let eventsPath = settings.path + '/events';
let locationsPath = settings.path + '/locations';

const constructorMethod = (app) => {
    app.use(peoplePath, peopleRoutes);
    app.use(eventsPath, eventRoutes);
    app.use(locationsPath, locationRoutes);

    app.use("*", (req, res) => {
        // any unmatched routes (ie, pages that do not exist) will hit this catch-all route
        res.status(404).render('404', {error: "Requested page not found"});

        // You could also do res.status(num).render(template, data)
    })
};

module.exports = constructorMethod;
