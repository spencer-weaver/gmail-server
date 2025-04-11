require('dotenv').config();

const cors = require('cors');
const express = require("express");

const mailRouter = require("./routes/mail");

// 1. this is the port on which the server will run
const port = process.env.PORT || 8080;

// creating the express app
const app = express();

// 2. adding middleware to parse the cookies and more
app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      return callback(null, true);
  },
    credentials: true,
}));
app.use(express.json());

// 3. adding the routes
app.use("/", mailRouter);

// 4. starting the server
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
