require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const ejs = require('ejs');
const connectDB = require("./config/db.connection");

const { userRouter }  = require('./routers/user.router');
const { requestRouter }  = require('./routers/request.router');
const { authRouter }  = require('./routers/auth.router');

const errorHandler  = require('./middleware/errorHandler.mw');
const { morgan } = require("./middleware/accessLogger.mw");
const logPath = path.join(__dirname, "/log" ,"access.log");

// Middlewares //
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');
//serve static files that do NOT need server-side processing (images,js,css..)
app.use(express.static(__dirname + '/public'));

//sets the 'views' folder as the location where Express should look for the EJS template files.
//Express uses this path to find and render the EJS templates.
app.set('views', path.join(__dirname, 'views'));

app.use(
    morgan(":date --> :method :url :status :response-time ms", {
        stream: fs.createWriteStream(logPath, { flags: "a" }),
    })
);

app.use("/auth" , authRouter)
app.use("/request", requestRouter);
app.use("/user", userRouter);

app.all('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.use(errorHandler);

//connections
connectDB();

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
