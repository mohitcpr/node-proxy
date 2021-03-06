var express = require("express");
var https = require("https");
var app = express();
var cors = require("cors");

app.options("*", cors());
app.get("/", cors(), function (req, res) {
  try {
    if (req.query.url) {
      https
        .get(req.query.url, resp => {
          let data = "";

          // A chunk of data has been recieved.
          resp.on("data", chunk => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            res.send(JSON.parse(data));
          });
        })
        .on("error", err => {
          res.send(err.message);
        });
    } else {
      res.send("Url not found");
    }
  } catch (e) {
    res.send(e);
  }
});

app.listen(process.env.PORT || 4002, function () {
  console.log("Example app listening on port 3000!");
});
