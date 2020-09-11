require("dotenv").config();
const express = require("express");
const database =  require("./config/database");

const { LOCAL_PORT, PORT } = process.env;

// express configs
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const base = "/api/v1";

// import routes
const movies = require("./routes/movie");
const comments = require("./routes/comment");

// connect routes to server
app.use(`${base}/movies`, movies);
app.use(`${base}/comments`, comments);

// root route
app.get("/", (req, res)=>{
    return res.redirect(base);
});

app.get("/api/v1", (req, res)=>{
    return res.status(200).json({
        sucess: true,
        message: "api root route",
        data: {
            statusCode: 200,
            description: "api root route"
        }
    });
});

const port = PORT || LOCAL_PORT;
app.listen(port, ()=>{
    console.log(`server listening on PORT *:${port}`);
});