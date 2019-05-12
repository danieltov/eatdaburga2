// * The Dependencies
// * ========================================
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers/burgers_controller');

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
app.use(routes);

// * Start the Server
// * ========================================
app.listen(PORT, function() {
    // ! Log (server-side) when our server has started
    console.log('Server listening on: http://localhost:' + PORT);
});
