const request = require("request");

exports.getCharacters = async(req, res)=>{
    const search = req.query.movie;
    if (!search) {
        return res.status(400).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 400,
                description: "movie search is required"
            }
        });
    }
    request.get("https://swapi.dev/api/films", async (error, response, body) => {
        if(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                    statusCode: 500,
                    description: "could not retrieve characters"
                }
            });
        }
        let parsedBody = await JSON.parse(body).results;
        let requiredMovie = parsedBody.filter(movie=> movie.title == search);
        return res.status(200).json({
            success: true,
            message: "operation successful",
            data: {
                statusCode: 200,
                description: "successfully retrieved movie characters",
                movie: search,
                characters: requiredMovie.length ? requiredMovie[0]["characters"] : "no characters found for this search"
            }
        });
    });
};