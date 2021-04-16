const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const database={
    users:[
        {
            id:'222',
            name:'John',
            email:'john@gmail.com',
            password:'cookies',
            entries:0,
            joined: new Date()
        },

        {
            id:'111',
            name:'Sally',
            email:'sally@gmail.com',
            password:'babanas',
            entries:0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.get('/profile/:id',(req,res)=>{
    const {id}= req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id == id){
            found = true;
            return res.json(user);
        }
    })

    if(!found){
            return res.status(404).json("No such user");
    }
})

app.post('/image',(req,res)=>{
    const {id}= req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id == id){
            found = true;
            user.entries++;
            return res.json(user);
        }
    })

    if(!found){
            return res.status(404).json("No such user");
    }
})





app.post('/signin',(req,res)=>{
    if(req.body.email ==database.users[0].email &&
        req.body.password ==database.users[0].password){
        res.json('Signing in! :D');
    }else{
        res.status(400).json('ERROR LOGGING IN LAGI!');
    }
})


app.post('/register',(req,res)=>{

    const {name,email,password} = req.body;

    if(req.body.email ==database.users[0].email){
        res.status(400).json('email already exist! :D');
    }else{
        database.users.push({
            id:'124',
            name:name,
            email:email,
            joined: new Date(),
            password:password,
            entries:0,
        })
        res.json(database.users[database.users.length-1]);
    }
})


app.listen(3001,()=>{
    console.log("[LOG HINLO] app is running on port 3000");
})

/**
 *  /signin  --> POST =success/fail
 *  //signin  --> POST = user obj
 * /profile/:userId --> GETT = user
 *  /image --> PUT
*/