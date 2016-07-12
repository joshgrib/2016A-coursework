const peopleRoutes = require("./people");
const eventRoutes = require("./events");
const locationRoutes = require("./locations");

const path = require('path');

const constructorMethod = (app) => {
    app.use("/people", peopleRoutes);
    app.use("/events", eventRoutes);
    app.use("/locations", locationRoutes);

    app.use("*", (req, res) => {
        // any unmatched routes (ie, pages that do not exist) will hit this catch-all route
        res.status(404).render('404');

        // You could also do res.status(num).render(template, data)
    })
};

module.exports = constructorMethod;
