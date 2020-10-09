const express = require("express");
const path = require("path");

const APP_PORT = process.env.APP_PORT || 8080;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(APP_PORT);
