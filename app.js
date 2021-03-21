const express = require('express');
const app = express();

const apiRoutes = require("./routes");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
    return res.json("Start with /api");
});

app.listen(process.env.port || 3000);

console.log('Web Server is listening at port '+ (process.env.port || 3000));