const express = require('express');
const router = express.Router();
const data = require("../data");

router.get("/serverform", (req, res) => {
    res.render('textManip/form');
});

router.post('/serverform', (req, res) => {
    let source_text = String(req.body.source_text);
    let input_string = String(req.body.input_string);
    let iterations = Number(req.body.iterations);
    let gap = Number(req.body.gap);
    let resp = data.textManip.insertWords(
        source_text,
        input_string,
        iterations,
        gap);
    let formData = {source_text: source_text, input_string: input_string, iterations: iterations, gap: gap}
    resp.then( (result) => {
        res.render('textManip/form', {result: result, formData: formData});
    }).catch( (e) => {
        res.status(500).render('textManip/form', {error: e, formData: formData});
    });
});

router.get("/clientform", (req, res) => {
    res.render('textManip/form', {clientForm: true});
});

module.exports = router;
