const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(express.static("public")); // loads all static file from server to client
app.use(bodyParser.urlencoded({ extended: true }));

//set view part 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


//access input data
app.post("/", function (request, res) {
    const firstName = request.body.fname;
    const lastName = request.body.lname;
    const email = request.body.email;

    // js object
    const data = {

        members: [
            {
                email_address: email,
                status: "subscribed",

                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    //converting js object into string
    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/7ae1e4fb13";

    const options = {
        method: "POST",
        auth: "malik:b6d68bffead..................eb22d71385-us10"
    }

    const re = https.request(url, options, function(response){

        if(response.statusCode === 200){
           res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){

            console.log(JSON.parse(data));
        });

    });

    re.write(jsonData);
    re.end();
})

// failure route
app.post("/failure", function(request, response){

    response.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("hey the, server is running on port 3000");
});

//api
//b6d68bffeada0479............................73eb22d71385-us10


//list id
// 7ae1e4fb13
