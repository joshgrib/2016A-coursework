const clientformRoutes = require("./clientform");
const serverformRoutes = require("./serverform");

const path = require('path');

const settings = require('../settings');

let clientformPath = settings.path + '/clientform';
let serverformPath = settings.path + '/serverform';

const constructorMethod = (app) => {
    app.use('/clientform'/*clientformPath*/, clientformRoutes);
    app.use('/serverform'/*serverformPath*/, serverformRoutes);

    app.use(settings.path+'/style', (req, res) => {
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
