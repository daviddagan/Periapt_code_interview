const wikipediaRoute = require("../routes/wikipediaRoute");

module.exports = function (app) {
    app.use("/introduction/", wikipediaRoute);
};