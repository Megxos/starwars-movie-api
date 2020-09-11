const database = require("../config/database");

exports.addComment = async(req, res)=>{

    await database.query("CREATE TABLE IF NOT EXISTS comments(id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, comment TEXT, ip_address TEXT, createdAt DATE)", (err, result, fields)=>{
        if(err){
            console.log(err);
            process.exit();
        }
        console.log(result);
    });

    let ip_address = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let date = new Date;
    let today = date.toJSON().split("T", 1)[0];

    let { comment } = req.body;

    if(!comment){
        return res.status(400).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 400,
                description: "comment cannot be empty"
            }
        });
    }

    await database.query("INSERT INTO comments(createdAt, ip_address, comment) VALUES (?, ?, ?)",  [today, ip_address, comment], (error, result, fields)=>{
        if(error){
            return console.log(error);
        }
        return res.status(201).json({
            success: true,
            message: "operation successful",
            data:{
                statusCode: 201,
                description: "comment added successfully",
                result
            }
        });
    });
};