const database = require("../config/database");

let comments;
// function to fetch comments from database
async function getComments(){
    await database.query("SELECT * FROM comments", (error, result, fields)=>{
        if(!error){
            comments = result;
            comments.sort((a, b) => {
                return b.createdAt - a.createdAt;
            });
        }
    });
}
// fill comments on startup to make first retrival fast
getComments();

exports.addComment = async(req, res)=>{
    //create a comments table if there is none
    await database.query("CREATE TABLE IF NOT EXISTS comments(id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, comment TEXT, ip_address TEXT, movie TINYTEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result, fields)=>{
        if(err){
            console.log(err);
            process.exit();
        }
    });
    // ip address of client
    let ip_address = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let { comment, movie_title } = req.body;

    if(!comment || !movie_title){
        return res.status(400).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 400,
                description: "comment or movie_title cannot be empty"
            }
        });
    }
    // limit comment length to 500 characters
    else if(comment.length > 500){
        return res.status(400).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 400,
                description: "comment cannot be more than 500 characters"
            }
        });
    }

    await database.query("INSERT INTO comments(ip_address, movie, comment) VALUES (?, ?, ?)",  [ip_address, movie_title, comment], (error, result, fields)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                    statusCode: 500,
                    description: "could not create comment"
                }
            });
        }
        return res.status(201).json({
            success: true,
            message: "operation successful",
            data:{
                statusCode: 201,
                description: "comment added successfully",
                comment: {
                    comment,
                    movie_title
                }
            }
        });
    });
};

//  get all comments in db
exports.getAll = async(req, res)=>{
    //update comment list
    getComments();

    const movie = req.query.movie
    // get comments for a particular movie
    if(movie){
        comments = comments.filter(comment => comment.movie == movie);
    }

    return res.status(200).json({
        success: true,
        message: "operation successful",
        data: {
            statusCode: 200,
            description: "successfully retrived all comments",
            comments
        }
    });
};