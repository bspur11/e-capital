const express = require('express');
const routes = require('./controllers');
const path = require('path'); // conect to style.css 14.1.3
// import sequelize connection
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars'); //sets up Hendlebars as app's template of choice 14.1.4
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);//sets up handlebar for Template 14.1.4
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.

app.use(express.static(path.join(__dirname, 'public'))); // connect to style.css 14.1.3

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
