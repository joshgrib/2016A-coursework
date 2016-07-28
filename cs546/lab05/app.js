const express = require("express");
let app = express();
let aboutMe = require("./about");

aboutMe(app);

app.listen(3000, () => {
    console.log("Server running!");
    console.log("See it at http://localhost:3000");
});
