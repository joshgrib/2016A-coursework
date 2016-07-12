const express = require('express');
const router = express.Router();
const data = require("../data");

// Single Person Page
router.get("/:id", (req, res) => {
    // Find a person by the provided id,
    // then display their information
    // As well as listing all events that they will be attending
    // Each of these events need to link to the event page, and show the event name
    // If a person is not found, display the 404 error page
    console.log(`Getting info for ${JSON.stringify(req.params.id)}`);
    data.people.lookup(req.params.id).then( (person_info) => {
        console.log(`Person info: ${JSON.stringify(person_info)}`);
        return data.events.getEventsForAttendee(person_info.id).then( (event_info) => {
            console.log(`Event info: ${JSON.stringify(event_info)}`);
            person_info.events = event_info;
            console.log(`Person info: ${JSON.stringify(person_info)}`);
            return person_info;
        });
    }).then( (person_info) => {
        //res.json(person_info);
        res.render("layouts/person", person_info);
    }).catch((e) => {
        res.render('404', {error: e});
    });
});

// People Index Page
router.get("/", (req, res) => {
    // Display a list of all people; it can be in an unordered list, or a table
    // Each of these people need to link to the single person page
    data.people.getAll().then( (people_list) => {
        res.render("layouts/list", {'content': people_list, 'type':'people'});
    }).catch( (e) => {
        res.render('404', {error: e});
    });
});

module.exports = router;
