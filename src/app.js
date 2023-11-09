const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");

const weather = require("./utils/weather");

const app = express();


//Define paths for Express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirPath = path.join(__dirname, "../public");

//Setup handlebars engine and views folder
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Andi Klein",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Andi Klein",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    author: "Andi Klein",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if(!address) {
    return res.send({error: "You must provide an address!"})
  }

  geocode(address, (error, {latitude, longitude, place} = {}, callback) => {
    if (error) {
      return res.send({error});
    }
  
    console.log("Getting weather data for " + place);
  
    weather(latitude, longitude, (error, {location, temperature} = {}) => {
      if (error) {
        return res.send({error});
      }
  
      console.log(
        `Current temperature in ${location} is ${temperature}℃`
      );

      res.send({
        address, 
        location: place, 
        temperature});

    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({products: []})
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: "404 Not Found",
        errorMessage: "Help article not found",
        author: "Andi Klein",
      });
})

app.get('*', (req, res) => {
    res.render("404", {
        title: "404 Not Found",
        errorMessage: "Page not found",
        author: "Andi Klein",
      });
})

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
