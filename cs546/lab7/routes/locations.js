const express = require('express');
const router = express.Router();
const data = require("../data");

// Single Location Page
router.get("/:id", (req, res) => {
    // Find a location by the provided id,
    // then display its information
    // As well as listing all events that will be at this location
    // Each of these events need to link to the event page and show the event name
    // If a location is not found, display the 404 error page
    data.locations.getLocation(req.params.id).then( (location_info) => {
        res.json(location_info);
    }).catch((e) => {
        res.status(404).json({error: e });
    });
});

// Location Index Page
router.get("/", (req, res) => {
    // Display a list of all locations; it can be in an unordered list, or a table
    // Each of these locations need to link to the single location page
    data.locations.getAllLocations().then( (location_list) => {
        res.json(location_list);
    }).catch( (e) => {
        res.status(404).json({error : e});
    });
});

module.exports = router;
