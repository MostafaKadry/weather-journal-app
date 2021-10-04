// declare variables
const port = 4000;
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Methods
const listenMethod = () => {
  console.log(`server  remaining on http://localhost${port}`);
};
const postAllinfoMethod = (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
    cityName: req.body.cityName,
  };
  res.send(projectData).status(200).end();
};
const getAllInfoMethod = (req, res) => {
  console.log("error of not update is here it is work 1 mostafa");
  res.send(projectData).status(200).end();
  console.log("it is wrok 2 mostafa");
};

// Setup Server
app.listen(port, listenMethod);

// post all Data
app.post("/postAllinformation", postAllinfoMethod);

// get all data
app.get("/getAllinformation", getAllInfoMethod);
