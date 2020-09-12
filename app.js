require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { LOCAL_PORT, PORT } = process.env;

// express configs
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const base = "/api/v1";

// import routes
const movies = require("./routes/movie");
const comments = require("./routes/comment");
const characters = require("./routes/characters");

// connect routes to server
app.use(`${base}/movies`, movies);
app.use(`${base}/comments`, comments);
app.use(`${base}/characters`, characters);

// root route
app.get("/", (req, res)=>{
    return res.redirect("http://swapilite.docs.apiary.io/#");
});
app.get("*", (req, res)=>{
    return res.redirect("/");
});

const port = PORT || LOCAL_PORT;
app.listen(port, ()=>{
    console.log(`server listening on PORT *:${port}`);
});