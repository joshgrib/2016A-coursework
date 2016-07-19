const express = require('express');
const router = express.Router();
const data = require("../data");
const insertWords = data.insertWords;

router.get("/serverform", (req, res) => {
    res.render('textManip/form', {clientForm: false});
});

router.post('/serverform', (req, res) => {
    console.log(req);
    res.render('textManip/form', {clientForm: false});
});

router.get("/clientform", (req, res) => {
    res.render('textManip/form', {clientForm: true});
});

module.exports = router;


/*
router.get("/static", (req, res) => {
    res.render("calculator/static", {});
});
router.get("/server", (req, res) => {
    res.render("calculator/server", {});
});
router.post("/server", (req, res) => {
    let operation = (req.body.operation || "add").toLowerCase();
    let firstNumber = parseInt(req.body.number1);
    let secondNumber = parseInt(req.body.number2);
    let result;
    try {
        switch (operation) {
            case "add":
                result = calculator.add(firstNumber, secondNumber);
                break;
            case "subtract":
                result = calculator.subtract(firstNumber, secondNumber);
                break;
            case "multiply":
                result = calculator.multiply(firstNumber, secondNumber);
                break;
            case "divide":
                result = calculator.divide(firstNumber, secondNumber);
                break;
            default:
                throw "Operation not supported"
        }
    } catch (e) {
        res.render("calculator/server", { firstNumber: firstNumber, secondNumber: secondNumber, operation: operation, error: e });
        return;
    }
    res.render("calculator/server", { firstNumber: firstNumber, secondNumber: secondNumber, operation: operation, result: result });
});
*/
