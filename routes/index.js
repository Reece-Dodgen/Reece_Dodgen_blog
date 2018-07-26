var express = require('express');
var router = express.Router();
var Posts = require('../db.json');
var request = require("request");
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(Posts);

  res.render('index', { title: 'Home', posts: Posts.posts });
});

/* GET contact page. */
router.get('/archive', function (req, res, next) {
  res.render('archive', { title: 'archive', posts: Posts.posts });
});

/* GET contact page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'contact', posts: Posts.posts });
});

router.get('/create', function (req, res, next) {
  res.render('create');
});

/* GET contact page. */
router.get('/archive', function (req, res, next) {
  // res.render('archive', { title: 'archive' });
  res.render('index', { title: 'Home', posts: posts.posts });
});

/* GET contact page. */
router.get('/delete/:id', function (req, res, next) {
  request({
    url: "http://localhost:8000/posts/" + req.params.id,
    method: "DELETE",
  }, function (error, response, body) {
    res.redirect("/archive");
  })
  // res.render('archive', { title: 'archive' });
  // res.render('index', { title: 'Home', posts: posts.posts });
});





//GET edit page

//  router.get('/edit/:id', function(req, res, next) {
//   var id;
//   var post = Posts.posts;

//   for(var i = 0; i < post.length; i++){
//     if(post[i].id == req.params.id){
//       id = i;
//     }
//   }

//   res.render('edit',{
//     title:'Edit Page',
//     posts : Posts.posts,
//     id : id,
//   });
// });


// UPDATE ROUTES
router.get('/edit/:id', function (req, res, next) {

  //make a post request to our database
  request({
    uri: "http://localhost:8000/posts/" + req.params.id,
    method: "GET",
  }, function (error, response, body) {
    console.log(JSON.parse(body));
    //send a response message
    res.render('edit', { message: false, posts: JSON.parse(body) });
  });

});

router.post('/edit/:id', function (req, res, next) {
  request({
    uri: "http://localhost:8000/posts/" + req.params.id,
    method: "PATCH",
    form: {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    }
  }, function (error, response, body) {
    // console.log(body);
    //send a response message
    res.render('edit', { message: 'Successfully Changed.', posts: JSON.parse(body) });
  });
});




module.exports = router;
