const express = require("express");
const path = require("path");
const app = express();
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

app.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/login.html'))
});

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    system.login(email, password, res)

});

app.get('/settings',(req, res) => {
    res.sendFile(path.join(__dirname, './public/settings.html'))
});

app.get('/myProduct', (req, res) => {
    res.sendFile(path.join(__dirname, './public/myProduct.html'))
});

app.get('/updateProduct/:Id',(req, res) => {
    res.sendFile(path.join(__dirname, './public/updateProduct.html'))
});

app.post('/updateBruger', (req, res) => {
    let nybruger ={
        navn: req.body.navn,
        email: req.body.email,
        password: req.body.password,
        item: []
    }
    system.updatebruger(nybruger, res)
});

app.delete('/deleteBruger', (req, res) => {
    system.deletebruger(res)
});

app.post('updateBruger/:brugerEmail', (req, res) => {
    

    if (dinbruger) {
        const index = system.brugere.findIndex(bruger => bruger.email === req.params.brugerEmail)
        system.brugere.splice(index, 1)
        let updatedbruger = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            products: found.products
        }
        system.brugere.push(updatedbruger)
    }  else {
        console.log('User could not be found')
    }
    res.send(data.users)
})

app.post('/logout', (req, res) => {

    
    system.logout(res)
})

//Endpoints to products

app.post('/myProduct', (req, res) => {

    let Id = uniqid();


    let myProduct = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        Id: Id,
        ownerEmail: ""
    };
    system.createProduct(myProduct, res);
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
