const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
main().catch(err=>console.log(err));

const app = express();

app.set("view engine", ejs);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1/wikiDB");
    console.log("connected");

    const articleSchema = new mongoose.Schema({
        title: String,
        content: String
    });

    const Article = mongoose.model("Article", articleSchema);

    app.route("/articles")
    
    .get(function(request,response){
        Article.find({})
        .then(function(foundArticles){
            response.send(foundArticles)
        })
        .catch(function(err){
            response.send(err);
        });
    })
    
    .post(function(request,response){

        const newArticle = new Article({
            title: request.body.title,
            content: request.body.content
        });

        newArticle.save()
        .then(function(){
            response.send("added successfully")
        })
        .catch(function(err){
            response.send(err);
        });


    })
    
    .delete(function(request,response){
        Article.deleteMany()
        .then(function(){
            response.send("deleted!")
        })
        .catch(function(err){
            response.send(err);
        });
    });


}

app.listen(3000,function(){
    console.log("server started on port 3000");
});