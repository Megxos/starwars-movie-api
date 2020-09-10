require("dotenv").config();
const express = require("express");

const { LOCAL_PORT, PORT } = process.env;

// express configs
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes

// connect routes to server

// root route
app.get("/", (req, res)=>{
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