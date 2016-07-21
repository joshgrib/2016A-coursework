const textManipRoutes = require("./textManip");

const constructorMethod = (app) => {
    app.use("/textManip", textManipRoutes);

    app.use("*", (req, res) => {
        res.redirect("/textManip/clientform");
    })
};

module.exports = constructorMethod;
