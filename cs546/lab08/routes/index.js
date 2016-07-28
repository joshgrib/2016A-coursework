const textManipRoutes = require("./textManip");

const constructorMethod = (app) => {
    app.use("/", textManipRoutes);

    app.use("*", (req, res) => {
        res.redirect("/clientform");
    })
};

module.exports = constructorMethod;
