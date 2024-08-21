const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


//using this code we can take data from form


app.use(express.json());
app.use(express.urlencoded({extended:true}));


//using static files such as css javascript and imges
app.use(express.static(path.join(__dirname, 'public')));
//using this we can render ejs pages which works like html
app.set('view engine','ejs');

app.get("/",function(req, res){
    fs.readdir(`./files`,function(err,files){
        // console.log(files)
        res.render("index",{files: files});
    })

});
app.post("/create",function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.content, function(err){
        res.redirect('/');
    })
    

});
app.post('/update',function(req,res){
    fs.rename(`./files/${req.body.previoustitle}`,`./files/${req.body.newtitle}.txt`,function(err){
        res.redirect('/');
    });
})
app.get('/edit/:filename',function(req, res){
   res.render('edit',{filename:req.params.filename});
})

app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,fileData){
       
        res.render('show',{filename: req.params.filename, 
            filedata: fileData
        });
    })
})
//how to make dynamic route
// app.get('/profile/:username',function(req,res){
//     res.send("welcome ," +req.params.username);
// })

// app.get('/profile/:username/:age',function(req,res){
//     res.send(req.params);
// })
app.listen(5000,function(){
    console.log("it is running");
})