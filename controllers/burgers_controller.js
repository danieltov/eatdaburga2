// * The Requires
// * ========================================
// ! Require our models
const db = require('../models');

// * The Routes
// * ========================================
module.exports = function(app) {
    const log = console.log;

    // ! GET route for fetching all burgers
    app.get('/', function(req, res) {
        // ! Use findAll method then capture all the instances of Burger in the promise
        // ! Pass each burger through res.json() to be available for the view
        db.Burger.findAll({}).then(burger => {
            // ! Bind the data into an object for the view (handlebars) to use
            let hbObj = { burgers: burger };

            // ! Log the new object
            log(hbObj);

            // ! Use the view to render the data
            res.render('index', hbObj);
        });
    });

    // ! POST route for adding a new burger
    app.post('/api/burgers', function(req, res) {
        db.Burger.create({
            burger_name: req.body.name,
            devoured: req.body.devoured
        }).then(burger => res.json(burger));
    });

    // ! PUT Route for updating a burger's 'devoured' status.
    app.put('/api/burgers/:id', function(req, res) {
        db.Burger.update(
            {
                devoured: req.body.devoured
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(burger => res.json(burger));
    });
};
