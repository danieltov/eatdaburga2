// * The Requires
// * ========================================

const express = require('express');

// ! Import the model to use its database specific methods
const burger = require('../models/burger');

// * The Routes & Logic
// * ========================================
const log = console.log;
const router = express.Router();

// ! The 'all' route
router.get('/', function(req, res) {
    // ! Invoke the .all() method with a callback that captures the data
    burger.all(function(data) {
        // ! Bind the data into an object for the view (handlebars) to use
        let hbObj = { burgers: data };

        // ! Log thƒe new object
        log(hbObj);

        // ! Use the view to render the data
        res.render('index', hbObj);
    });
});

// ! The 'add' route
router.post('/api/burgers', function(req, res) {
    // ! Pass an array with the column names (strings)
    // ! Pass an array with the request-body values (taken from the form on the html page)
    // ! Capture the result in a callback
    burger.add(
        ['burger_name', 'devoured'],
        [req.body.name, req.body.devoured],
        function(result) {
            res.json({ id: result.insertID });
        }
    );
});

// ! The 'update' route
router.put('/api/burgers/:id', function(req, res) {
    // ! Declare the condition (:id)
    let condition = 'id = ' + req.params.id;

    //! Log the condition
    log('(Condition) WHERE ' + condition);

    // ! Declare object with the column-values
    let devouredData = req.body;
    // ! Log the devoured Data
    log('Devoured : ' + devouredData);

    // ! Invoke .update() method and pass through new variables
    // ! Capture result in the callback
    burger.update(devouredData, condition, function(result) {
        if (result.changedRows == 0) {
            // ! If no rows were changed, then the ID must not exist, so return 404
            return res.status(404).end();
        } else {
            // ! If >0 rows changed, it worked! Return 200 and end.
            res.status(200).end();
        }
    });
});

// * The Export
// * ========================================

module.exports = router;
