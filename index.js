require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const cors = require("cors");
const fs = require("fs");
const path = require("path");
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

app.use(express.static(__dirname + '/client'));

app.use(
    morgan(":date --> :method :url :status :response-time ms", {
        stream: fs.createWriteStream(logPath, { flags: "a" }),
    })
);


app.use("/auth" , authRouter)
app.use("/request", requestRouter);
app.use("/user", userRouter);

app.all('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/login.html'));
});

app.use(errorHandler);

//connections
connectDB();

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
