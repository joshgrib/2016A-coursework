const express = require('express');
const router = express.Router();
const data = require("../data");

router.get("/", (req, res) => {
    res.render('layouts/form', {serverForm: true});
});

router.post('/', (req, res) => {
    console.log(req);
    res.status(200).send(req.body.source_text);
});

module.exports = router;
