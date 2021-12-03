const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
const system = require('./system')
var uniqid = require('uniqid'); 
app.use(express.static('public'))

/////// main siden hvor du også kan logout\\\\\\\\
app.get('/', (req, res) =>{
    const authentication = system.authentication();

    if(authentication) {
        res.sendFile(path.join(__dirname,'./public/index.html'));
    } else {
        res.sendFile(path.join(__dirname,'./public/login.html'));
    }
});

app.post('/logout', (req, res) => {

    
    system.logout(res)
})




/////////////// oprettelse af profil \\\\\\\\\\\\\\\
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



//////////////// logge ind på din profil \\\\\\\\\\\\\\
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



//settings hvor du kan forskellige ting: updatebruger, deletebruger, updateproduct og delete product \\ 
app.get('/settings',(req, res) => {
    const authentication = system.authentication();

    if(authentication) {
        res.sendFile(path.join(__dirname,'./public/settings.html'));
    } else {
        res.sendFile(path.join(__dirname,'./public/login.html'));
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




////////Endpoints to products\\\\\\\\\\\



//// her er til oprettelse af et nyt produkt \\\\
app.get('/newProduct', (req, res) => {
    const authentication = system.authentication();

    if(authentication) {
        res.sendFile(path.join(__dirname,'./public/newproduct.html'));
    } else {
        res.sendFile(path.join(__dirname,'./public/login.html'));
    }
});

app.post('/newProduct', (req, res) => {

    let Id = uniqid();


    let Product = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        Id: Id,
        ownerEmail: ""
    };
    system.newProduct(Product, res);
});



// her kan man opdatere sit produkt som er under settings\\
app.get('/updateProduct/:Id',(req, res) => {
    const authentication = system.authentication();

    if(authentication) {
        res.sendFile(path.join(__dirname,'./public/updateProduct.html'));
    } else {
        res.sendFile(path.join(__dirname,'./public/login.html'));
    }
});
app.post('/updateProducts', (req, res) => {
    let myProduct = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        Id: req.body.Id,
        ownerEmail: ""
    };
    system.updateProduct(myProduct, res);
})



// fjerne sit produkt som man også kan under settings \\
app.delete('/deleteProduct', (req, res) => {
    system.deleteProduct(req.body.Id, res);
})




app.get('/allProducts', (req, res) => {
    system.allProducts(res);
})

//idk\\
app.get('/allMyProducts', (req, res) => {
    system.allMyProducts(res);
})



const PORT = 3000;
app.listen(PORT, ()  => {
    console.log(`server is running at Port: ${PORT}`);

})
