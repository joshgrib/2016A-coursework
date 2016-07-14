const peopleRoutes = require("./people");
const eventRoutes = require("./events");
const locationRoutes = require("./locations");

const path = require('path');

const constructorMethod = (app) => {
    app.use("/app1/people", peopleRoutes);
    app.use("/app1/events", eventRoutes);
    app.use("/app1/locations", locationRoutes);

    app.use("*", (req, res) => {
        // any unmatched routes (ie, pages that do not exist) will hit this catch-all route
        res.status(404).render('404', {error: "Requested page not found"});

        // You could also do res.status(num).render(template, data)
    })
};

module.exports = constructorMethod;
