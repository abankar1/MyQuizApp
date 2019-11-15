var express=require('express');
var bodyParser=require('body-parser');
var fs=require('fs');
var app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, 'localhost',function(){
    console.log('Server started. Listening to port 3000');
})

app.post('/login', function(request, response){
    //console.log("Body:"+request.body);
    console.log('Reached login');
    var email=request.body.email;
    var password=request.body.password;
    //console.log("Email:"+request.body.email);
    //console.log("Password:"+request.body.password);
    
    // user={
    //     "name":"Akshay",
    //     "email":"akshay@test.com",
    //     "password":"akshay"
    //   }
    
    var user=fs.readFileSync('./assets/data/user.json');
    //console.log(JSON.parse(user));
    //var jsonUser=JSON.parse(user);
    //console.log(JSON.stringify(user));
    var jsonUser=JSON.parse(user);
    if(jsonUser.email==email && jsonUser.password==password)
    {
        console.log("Login authorized");
        console.log("UserName: "+jsonUser.name);
        console.log("Email: "+jsonUser.email);
        response.status(200).json({
            user:{
                "name":jsonUser.name,
                "email":jsonUser.email
            }
        });
    }
    else{
        // return response.status(500).json({
           
        //     message: 'This is an error!'
        //  });
        console.log("Login unauthorized");
        // response.send(401);   
        response.status(500).json({
            message: 'Invalid username or password'
        });
    }
});

app.get('/categories', function(request, response){
    var categories=["MUSIC","MOVIES","TECHNOLOGY"]
    response.send({
        "categories":categories
    });
    
})
app.get('/categories/:category',function(request,response){
    var category=request.params.category;
    console.log("Selected Category: "+category);
    var music=fs.readFileSync('./assets/data/music.json');

    if(category=="music")
    {
        var music=fs.readFileSync('./assets/data/music.json');
        console.log("Music Data: "+music);
        response.send(
            JSON.parse(music));
    }
    else if(category=="movies")
    {
        var movies=fs.readFileSync('./assets/data/movies.json');
        console.log("Movies Data: "+movies);
        response.send(
            JSON.parse(movies));
    }
    else
    {
        var technology=fs.readFileSync('./assets/data/technology.json');
        console.log("Technology Data: "+technology);
        response.send(
            JSON.parse(technology));
    }

});