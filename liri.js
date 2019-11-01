require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");

//access API keys
var keys = require("./key");

var spotify = new Spotify(keys.spotify);
const ombdKey = keys.omdb.key;

var inputString = process.argv;
var command = inputString[2];

switch (command) {

    case "concert-this":

        var artist = "";
        for (let i = 3; i < inputString.length; i++) {
            if (i > 3 && i < inputString.length) {
                artist = artist + "+" + inputString[i];
            } else {
                artist += inputString[i]
            }
        };

        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        console.log(queryURL);

        axios.get(queryURL).then(function(response){
            for(let i = 0; i < 5; i++){
            console.log("Venue Name: " + response.data[i].venue.name);
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
            console.log("Date of the Event: " + moment(response.data[i].datetime).format('L'));
            console.log("______________________________________");
            }
        }).catch(function(error){
            if(error.response){
                console.log("*Data*");
                console.log(error.response.data);
                console.log("*Status*");
                console.log(error.response.status);
                console.log("*Header*");
                console.log(error.response.headers);
            }
            if (error.request) {
                console.log("Error with Request");
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
            console.log(error.config);
        });
        break;

    case "spotify-this-song":
        var song = "";
        for(let i = 3; i < inputString.length; i++){
            if(i > 3 && i < inputString.length){
                song = song + " " + inputString[i]
            }else{
                song += inputString[i]
            }
        }

        spotify.search({type: 'track', query:"'" + song + "'", limit: 1})
        .then(function(response){
            console.log("#####Search Complete!#######");
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Spotify URL: " + response.tracks.items[0].artists[0].href);
            console.log("Album Name: " + response.tracks.items[0].album.name);
            console.log("________________________");
            
        })
        .catch(function(error){
            if(error.response){
                console.log("*Data*");
                console.log(error.response.data);
                console.log("*Status*");
                console.log(error.response.status);
                console.log("*Header*");
                console.log(error.response.headers);
            }
            if (error.request) {
                console.log("Error with Request");
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
            console.log(error.config);
        });
        break;

    case "movie-this":
            var movie = "";
            for(let i = 3; i < inputString.length; i++){
                if(i > 3 && i < inputString.length){
                    movie = movie + " " + inputString[i]
                }else{
                    movie += inputString[i]
                }
            }
            

        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=" + ombdKey;
        console.log(queryURL);
        
        axios.get(queryURL).then(function(response){
            const result = response.data;
            console.log("#####Search Complete!#######");
            console.log("Title: " + result.Title);
            console.log("Year: " + result.Year);
            console.log("IMDB Rating: " + result.Ratings[0].Value);
            console.log("Rotten Tomato Rating: " + result.Ratings[1].Value);
            console.log("Country: " + result.Country);
            console.log("Language: " + result.Language);
            console.log("Plot: " + result.Plot);
            console.log("Actors: " + result.Actors);
            console.log("______________________________")
        }).catch(function(error){
            if(error.response){
                console.log("*Data*");
                console.log(error.response.data);
                console.log("*Status*");
                console.log(error.response.status);
                console.log("*Header*");
                console.log(error.response.headers);
            }
            if (error.request) {
                console.log("Error with Request");
                console.log(error.request);
            } else {
                console.log("error", error.message);
            }
            console.log(error.config);
        });

        break;

    case "do-what-it-says":
        fs.readFile("random.txt",{encoding: "utf8"}, function(err, data){
            if(err){
                console.log("Error: " + err);
            }else{
              inputString.splice(2, data);
            }
        })
};

