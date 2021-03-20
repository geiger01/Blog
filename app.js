//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {

 title: String,

 content: String

};

const Post = mongoose.model("Post", postSchema);


const homeStartingContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const aboutContent = "Yoooo look at my BLOGGGGG i am the globglobgabgalab the schwabellwabbledibblewibbledab dab.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req, res) {

    res.render('home', {homeContent: homeStartingContent, posts:blogPosts});
});

app.get('/about', function(req, res) {

    res.render('about', {aboutContent: aboutContent});
});

app.get('/contact', function(req, res) {

    res.render('contact', {contactContent: contactContent});
});

app.get('/compose', function(req, res) {

    res.render('compose');
});

app.post("/compose", function(req,res){

    const post = new Post ({

        title: req.body.postTitle,

        content: req.body.postBody

        });

    post.save()


    let postTitle= req.body.postTitle;
    let newPost = req.body.newPost;

    var post = {
      title: postTitle,
      body:newPost
    };

    blogPosts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
    var urlTitle=_.lowerCase(req.params.postName) // makes the title lower cased

    blogPosts.forEach(function(post){
      const actualTitle= _.lowerCase(post.title);

      if (actualTitle===urlTitle){

          res.render("post",{title: post.title ,body: post.body})

      }
    });

});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
