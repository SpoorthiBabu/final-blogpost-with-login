const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path=require("path");
const _ =require("lodash");
const mongoose= require("mongoose")



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
// const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const contactContent = "you can contact us anytime at our headoffice given below :)";

// const homeStartingContent = "";

const aboutContent = "We are a bunch of problem solving and problem seeking people who have a desire to learn and grow "
const app = express();
app.set('view engine', 'ejs');
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/blogPost")
.then( ()=>{
    console.log("mongodb connected succesfully");
})
.catch( (err)=>{
    console.log("the error in connecting to mongodb is  ",err);
})

const blogSchema = new mongoose.Schema({
    title: String,
    body: String
})

const Blog= new mongoose.model('Blog',blogSchema)

const blog1= new Blog({
    title: "Default blog 1",
    body: "Lacus vel facilisis volutpat est velit egestas dui id ornare.  erat pellentesque adipiscing."
})
const blog2= new Blog({
    title: "Default blog 2",
    body: "Lacus vel facilisis volutpat est velit egestas dui id ornare.  erat pellentesque adipiscing."
})

// app.get("/", function(req,res){
//     res.render("home",obj);

// });

app.get("/", function(req, res){
    Blog.find({})
        .then( (answer)=>{
            console.log("the answer is ", answer)
            if(answer.length === 0)
            {
                const startingBlogs=[blog1,blog2];
                try{
                    console.log("inside then block");
                    Blog.insertMany(startingBlogs)
                }
                catch{ (err)=>{
                console.log("errorrr   ",err); 
                }}
    
            }
            res.render("home", {toPrint: answer.title , newItems: answer})
        })
    .catch( (err)=>{
        console.log("error in finding the default blog is ", err);
    })
})




// const object1={
//     aboutContent: aboutContent
// };
// const object2={
//     contactContent: contactContent
// };

app.get("/about", function(req,res){
    res.render("about",{aboutContent: aboutContent})
});
app.get("/contact", function(req,res){
    res.render("contact",{contactContent: contactContent})
});

app.get("/compose", function(req, res){
    res.render("compose")
});



app.post("/compose", function(req, res){
    //var input= req.body.postBody;
    //console.log(req.body.postBody);
    //res.send("hi")

    const blog2= new Blog({
        title: req.body.postTitle,
        body: req.body.postBody
    })
    blog2.save();
    res.redirect("/")


    // const post={
    //     title: req.body.postTitle,
    //     content: req.body.postBody
    // };
    // //it cannot just be postTitle as its not defined in this file but in compose.ejs

    // posts.push(post);
    // res.redirect("/");
});

//for dynamic website
app.get("/:answer.title", function(req,res){

    //console.log(req.params.postName);
    const requestedTitle= _.lowerCase(req.params.postName);

  //  _.lowerCase([string='']) for array of strings
  //this basically removes any special characters and converts everything to lower case 
  //so when title is Another post and we are searching for localhost:3000/posts/another-post, 
  //it matches (if condition is satisfied) and console logs "match found"

    answers.forEach(function(post){ 

        const storedTitle= _.lowerCase(post.title);
        if(storedTitle === requestedTitle)
        {
            //console.log("match found!");
            res.render("home", 
                {title: post.title,
                body: post.body}
            );
        }

    })

})

//  MY CODE
app.get("/delete", function(req,res){
    Blog.find({})
        .then( (answer)=>{
            console.log("the answer is ", answer)
           
            res.render("delete", { newItems: answer})
        })
    .catch( (err)=>{
        console.log("error in finding the default blog is ", err);
    })
})
app.post("/delete", function(req,res){
    blogToBeDeleted = req.body.delete;
    Blog.findOneAndDelete
    ({ title: blogToBeDeleted })
    .then( (deletedItem)=>{
        console.log("deleted item is ", deletedItem);
        res.redirect("/")
    })
    .catch( (err)=>{
        console.log("the error in deleting is ",err);
    })
    //res.redirect("/");
})
// handle POST request to delete a post











//THIS WORKS WITH ID
// app.post('/delete', async (req, res) => {
//     const postId = req.body['delete-text'];
//     try {
//       const deletedPost = await Blog.findByIdAndDelete(postId);
//       if (!deletedPost) {
//         res.send('Post not found.');
//       } else {
//         res.redirect('/');
//       }
//     } catch (error) {
//       console.log(error);
//       res.send('An error occurred while deleting the post.');
//     }
//   });



//LATEST ONE
// app.get('/', async (req, res) => {
//     try {
//       const posts = await Blog.find().sort({ createdAt: 'desc' }).exec();
//       res.render('index', { posts: posts });
//     } catch (err) {
//       console.error(err);
//       res.render('error/500');
//     }
//   });
  
  
  // define route for handling delete form submission
//   app.post('/delete', function(req, res) {
//     const postTitle = req.body.delete;
//     Blog.findOneAndDelete({ title: postTitle }, function(err) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.redirect('/');
//       }
//     });
//   });
  
  
  

app.listen(3003, function(req,res){
    console.log("server has started on port 3003")
});
