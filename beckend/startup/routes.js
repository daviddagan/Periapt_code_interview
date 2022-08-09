const wikipediaRoute = require("../routes/wikipediaRoute");
const userRoute = require("../routes/userRoute");

module.exports = function (app) {
    app.use("/introduction/", wikipediaRoute);
    app.use("/user", userRoute);

};