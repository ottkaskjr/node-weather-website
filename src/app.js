//path is a core node module
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
//adding the public directory
const publicDirectoryPath = path.join(__dirname, '../public');
//customizing the default views directory, to customize the path watch lecture 48
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//initalizing handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
//registers the path were the partials are
hbs.registerPartials(partialsPath);
//app.use() is a way to customize your server, express.static() is an express function
app.use(express.static(publicDirectoryPath));
//since we are using the public folder as static, '/' will be handled as index.html, '/help' as help.html and '/about' as about.html

app.get('/', (req, res) => {
  //render a file
  res.render('index', {
    title: 'Weather app',
    name: 'Mr. Robot'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Mr. Robot'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Mr. Robot'
  });
});

app.get('/array', (req, res) => {
  res.send([
    {
      name: 'Andrew'
    },
    {
      name: 'Sarah'
    }
  ]);
});

// use %20 to write space in url
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You have to provide an address'
    });
  }
  //{ latitude, longitude, location } = {} by adding the empty object in the end we ensure the program doesn't crash on certain conditions
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  //following is an example of a query string
  //http://localhost:3000/products?search=games&rating=5
  //to add key-value pairs we type ?key=value
  //to add a new pair we separate them with &
  //req object has a query property, which contains all the query string information
  console.log(req.query.search);
  if (!req.query.search) {
    //when there is no 'search' the code stops here
    return res.send({
      error: 'You must provide a search term'
    });
  }
  res.send({
    products: []
  });
});

///help/* everything after help
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found!',
    name: 'Mr. Robot'
  });
});

/*Everything else*/
// '*' means everything else than the routes above, BUT IT HAS TO BE LAST
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found!',
    name: 'Mr. Robot'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
