const express = require("express");
const app = express();
app.all("/", (req, res) => {
    res.send("Status: Online");
});
module.exports = (port) => app.listen(port, () => {
    console.log("Server is ready!");
});