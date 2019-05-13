// * The Dependencies
// * ========================================
const express = require('express');
const exphbs = require('express-handlebars');
const db = require('./models');

// * The Configurations
// * ========================================
const PORT = process.env.PORT || 8080;
const app = express();
// ! Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// * The Middleware
// * ========================================
// ! Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Set The View
// * ========================================

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// * Set The Routes
// * ========================================
require('./controllers/burgers_controller.js')(app);

// * Syncing our sequelize models and then starting our Express app
// * =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});
