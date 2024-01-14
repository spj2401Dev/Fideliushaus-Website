//Main Webserver. Changes require a restart. For instructions please refer to the README.md

const express = require('express');
const app = express();
const fs = require('fs');

const routes = JSON.parse(fs.readFileSync('routes.json'));

app.use(express.static('public/images'));
app.use(express.static('public/fonts'));

app.get("/:page", function(req, res) {
  const page = `/${req.params.page}`;

  if (routes[page]) { 
    res.sendFile(`${__dirname}${routes[page]}`);
  } else {
    if (routes["/404"]) {
      res.status(404).sendFile(`${__dirname}${routes["/404"]}`);
    } else {
      res.status(404).send("404 Page Not Found");
    }
  }
});

app.get("/", function(req, res) {
  if (routes["index"]) {
    res.sendFile(`${__dirname}${routes["index"]}`);
  } else {
    res.send("Index page is not defined! Please try again later.");
  }
});

app.use(function(req, res, next) { // This function has to be the last! It handels 404's, not handeled by the initital 404 handler.
    if (routes["/404"]) { // If anything is below this, it will not be routed!
      res.status(404).sendFile(`${__dirname}${routes["/404"]}`);
    } else {
      res.status(404).send("404 Page Not Found");
    }
  });

const port = 4000;
const ip = "192.168.178.123"
app.listen(port, ip, () => {
  console.log(`Web Server is running on: ${ip}:${port}`);
});