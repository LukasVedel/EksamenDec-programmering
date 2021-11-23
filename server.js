const express = require("express");
const path = require("path");
const app = express();
var fs = require('fs');
app.use(express.json());
const system = require('./system')


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/register', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/register.html'))
});

app.post('/register', (req, res) => {
    let nybruger ={
        navn: req.body.navn,
        email: req.body.email,
        password: req.body.password,
        item: []
    }
    system.saveuser(nybruger, res)
})





const PORT = 3000;
app.listen(PORT, ()  => {
    console.log(`server is running at Port: ${PORT}`);

})
