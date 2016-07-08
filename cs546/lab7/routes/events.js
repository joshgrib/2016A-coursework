const express = require('express');
const router = express.Router();
const data = require("../data");

// Single Event Page
router.get("/:id", (req, res) => {
    // Find a event by the provided id,
    // then display its information
    // As well as listing the names of all the attendees that will be at this event
    // Each of these attendee names will need to link to their person page
    // You will also list the location of the event, said location's name, and a link to the location page

    // If a event is not found, display the 404 error page
    console.log(req.params.id);
    data.events.getEvent(req.params.id).then( (event_info) => {
        res.json(event_info);
    }).catch((e) => {
        res.status(500).json({error: e });
    });
    //res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Event Index Page
router.get("/", (req, res) => {
    // Display a list of all events; it can be in an unordered list, or a table
    // Each of these events need to link to the single event page
    data.events.getAllEvents().then( (event_list) => {
        res.json(event_list);
    }).catch( (e) => {
        res.status(500).json({error : e});
    });
    //res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;
