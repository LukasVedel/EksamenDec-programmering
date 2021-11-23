const express = require("express");
const path = require("path");
const app = express();
var fs = require('fs');
app.use(express.json());
const system = require('./system')


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});














const PORT = 3000;
app.listen(PORT, ()  => {
    console.log(`server is running at Port: ${PORT}`);

})
