const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("Hey the server is running!");
    console.log("Check it out at http://localhost:3000");
});
