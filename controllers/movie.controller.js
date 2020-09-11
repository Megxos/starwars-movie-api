// INSERT INTO `starwars_db`.`comments` (`id`, `createdAt`, `ip_address`, `comment`) VALUES ('2', '2020-09-11', '192.168.0.3', 'I love star wars');
const database = require("../config/database");
const request = require("request");

const { DB_NAME } = process.env;

exports.getMovies = async (req, res)=>{
    let movies = [];
    let comments = [];
    
    await database.query(`SELECT * FROM comments`, (error, result, fields)=>{
        if(error){
            return console.log(error);
        }
        comments = result;
    });

    request.get("https://swapi.dev/api/films", async(error, response, body)=>{
        if(error){
            return console.log(error);
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
        res.status(200).json({
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