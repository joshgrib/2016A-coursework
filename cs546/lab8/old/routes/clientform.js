const express = require('express');
const router = express.Router();
const data = require("../data");

router.get("/", (req, res) => {
    res.render('layouts/form', {clientForm: true});
});

module.exports = router;
