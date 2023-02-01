const express = require("express")
const app = express()
const path = require("path")
const { v4: uuid } = require('uuid');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

// app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname,"/view"))
app.set('view engine', 'ejs')
let comments = [
    {
        id : uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id : uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id : uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id : uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]
// let comments =[
//     {
//         username: 'Goku',
//         comment: 'ultra instint'
//     },
//     {
//         username: 'vegita',
//         comment: 'Ultra ego'
//     },
//     {
//         username: 'Gohan',
//         comment: 'new age instint'
//     },
//     {
//         username: 'lord berus',
//         comment: 'God of destroyer'
//     }
// ]

// var com = comments

app.get('/comments',(req,res)=>{
    res.render('app.ejs', {comments})
})


app.get('/newcomments',(req,res)=>{
    res.render('new.ejs')
})

app.post('/comments',(req,res)=>{
    const {username, comment} = req.body
    comments.push({comment,username, id: uuid()})
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res)=>{
    const {id} = req.params
    const comm = comments.find(c => c.id === id)
    res.render('show.ejs', {comm})
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params
    const comm = comments.find(c => c.id === id)
    res.render('edit.ejs', {comm})
})

app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})
// app.patch('/comments/:id',(req,res)=>{
//     const {id} = req.body
//     let newcomments = req.params.commentnu
//     let found = comments.find(c => c.id === id)
//     found.commentnu = newcomments
//     res.redirect('/comments')
// })

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);

    //get new text from req.body
    const newCommentText = req.body.comment;
    //update the comment with the data from req.body:
    foundComment.comment = newCommentText;
    //redirect back to index (or wherever you want)
    res.redirect('/comments')
})


app.get('/tacos',(req,res)=>{
    console.log(req.body)
    res.send("GET")
})

app.post('/tacos',(req,res)=>{
    const {meat, qty} = req.body
    res.send(`Post request send ${meat} its quanty ${qty}`)
})

app.listen('3000',()=>{
    console.log("server on")
})