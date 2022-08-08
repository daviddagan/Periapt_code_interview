const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");


const app = express();
// app.use(helmet());
// app.use(cors());
app.use(express.json());

require("./startup/routes")(app);

app.use((req, res, next) => {
    next(createError.NotFound());
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


