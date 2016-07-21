const peopleRoutes = require("./people");
const eventRoutes = require("./events");
const locationRoutes = require("./locations");

const path = require('path');

const constructorMethod = (app) => {
    app.use('/people', peopleRoutes);
    app.use('/events', eventRoutes);
    app.use('/locations', locationRoutes);

    app.use('/style', (req, res) => {
        //send the css
        res.sendFile('main.css', { root: path.join(__dirname, '../public/css') })
    });

    app.use("*", (req, res) => {
        // any unmatched routes (ie, pages that do not exist) will hit this catch-all route
        res.status(404).render('404', {error: "Requested page not found"});

        // You could also do res.status(num).render(template, data)
    });
};

module.exports = constructorMethod;
