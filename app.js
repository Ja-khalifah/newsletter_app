const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))

mongoose.connect('mongodb+srv://admin-abdulqadir:todolist123@todolist.ipnkg.mongodb.net/newsletterDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to the database successfully')
    }
})

const memberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

const Member = mongoose.model("Member", memberSchema);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {
    const email = req.body.email

    new Member({
        email: email,
    }).save()

    Member.find({
        email: email
    }, function (err, foundMember) {
        // setTimeout(function () {
        //     res.redirect('/');
        // }, 2000)
        res.render('success');
        // if(foundMember.email === email){
        //     res.render('success')
        // }else {
        //     res.render('success')
        // }
    })

})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function (req, res) {
    console.log('server running on port 3000')
})