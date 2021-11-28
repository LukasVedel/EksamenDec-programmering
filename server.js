const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
const system = require('./system')
var uniqid = require('uniqid'); 

app.get('/', (req, res) =>{
    const authentication = system.authentication();

    if(authentication) {
        res.sendFile(path.join(__dirname,'./public/index.html'));
    } else {
        res.sendFile(path.join(__dirname,'./public/login.html'));
    }
});

app.get('/register', (req, res) =>{
    const authentication = system.authentication();

    if(authentication) {
        res.sendFile(path.join(__dirname,'./public/index.html'));
    } else {
        res.sendFile(path.join(__dirname,'./public/register.html'));
    }
});

app.post('/register', (req, res) => {
    let nybruger ={
        navn: req.body.navn,
        email: req.body.email,
        password: req.body.password,
        item: []
    }
    system.saveUser(nybruger, res)
})

app.get('/login', (req, res) =>{
    const authentication = system.authentication();

    if(authentication) {
        res.sendFile(path.join(__dirname,'./public/index.html'));
    } else {
        res.sendFile(path.join(__dirname,'./public/login.html'));
    }
});

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    system.login(email, password, res)

});

app.get('/settings',(req, res) => {
    const authentication = system.authentication();

    if(authentication) {
        res.sendFile(path.join(__dirname,'./public/settings.html'));
    } else {
        res.sendFile(path.join(__dirname,'./public/register.html'));
    }
});



app.post('/updateBruger', (req, res) => {
    let nybruger ={
        navn: req.body.navn,
        email: req.body.email,
        password: req.body.password,
        item: []
    }
    system.updateBruger(nybruger, res)
});

app.delete('/deleteBruger', (req, res) => {
    system.deleteUser(res)
});


app.post('/logout', (req, res) => {

    
    system.logout(res)
})

//Endpoints to products
app.get('/myProduct', (req, res) => {
    res.sendFile(path.join(__dirname, './public/myProduct.html'))
});


app.post('/myProduct', (req, res) => {

    let Id = uniqid();


    let myProduct = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        Id: Id,
        ownerEmail: ""
    };
    system.myProduct(myProduct, res);
});

app.get('/updateProduct/:Id',(req, res) => {
    res.sendFile(path.join(__dirname, './public/updateProduct.html'))
});

app.delete('/deleteProduct', (req, res) => {
    system.deleteProduct(req.body.Id, res);
})

app.get('/allProducts', (req, res) => {
    system.AllProducts(res);
})

app.get('/ allMyProducts', (req, res) => {
    system.allMyProducts(res);
})

app.post('/updateProducts', (req, res) => {
    let myProduct = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        Id: Id,
        ownerEmail: ""
    };
    system.updateProduct(myProduct, res);
})

const PORT = 3000;
app.listen(PORT, ()  => {
    console.log(`server is running at Port: ${PORT}`);

})
