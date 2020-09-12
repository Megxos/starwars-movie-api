const database = require("../config/database");
const request = require("request");

exports.getMovies = async (req, res)=>{
    let movies = [];
    let comments = [];
    
    await database.query(`SELECT * FROM comments`, (error, result, fields)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                    statusCode: 500,
                    description: "could not retrieve comments"
                }
            });
        }
        comments = result;
    });

    request.get("https://swapi.dev/api/films", async(error, response, body)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: { 
                    statusCode: 500,
                    description: "could not retrieve movies"
                }
            });
        }
        // parse body and pick out required fields
        let parsedBody = await JSON.parse(body).results;

        // sort movies in ascending other by releasse date
        parsedBody.sort((a, b)=>{
            return new Date(a.release_date) - new Date(b.release_date);
        });

        parsedBody.map(movie=>{ 
            movies.push({ 
                title: movie.title, 
                opening_crawl: movie.opening_crawl, 
                characters: movie.characters,
                comments: comments.filter(comment => comment.movie == movie.title).length
            });
        });
        return res.status(200).json({
            success: true,
            message: "operation successful",
            data: { 
                statusCode: 200,
                results: movies.length,
                description: "list of star wars movies",
                movies
            }
        });
    });
};