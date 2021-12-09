var fs = require('fs')



// variale som er tilkoblet til alle endpoint og min login funktion så man kun kan komme ind på bestemte sider hvis logget ind 
var loginEmail = "";




// alle funktioner som har med bruger/login \\
// if else til at se om loginEmail er lige med noget, hvis den er tom er der ikke en bruger som er logget ind og omvendt hvis en bruger er logget ind.
function authentication() {
    if(loginEmail === "") {
        return false;
    } else {
        return true;
    }
}

// registering af profil \\
function saveUser(user, res) {
// læser min json fil.
    const allebrugere = fs.readFileSync('json.json');

// her ved hjælp af parse går jeg ind i min json fil og laver brugeren til et objekt. 
    const parseBruger = JSON.parse(allebrugere)
// her laver jeg en variable som er = false hvilket bruges efterfølgende.
    let found = false;

// loop som her er med til at kører igennem alle brugere og se om der allerde er brugt den email som man skriver. 
    for (var i = 0; i < parseBruger.length; i++) {
        if (user.email === parseBruger[i].email) {
            // her finder den en email som bliver brugt 
            found = true;
        }
    }
    // her er den false 
    if (!found) {
      //her bruger jeg push som tilføjer min bruger til et array   
        parseBruger.push(user)
        
        // her laver jeg arrayet om til et JSON object som kan bruget i json.json
        const jsonBruger = JSON.stringify(parseBruger)
       // bliver sendt til opbevaring i json fil 
       fs.writeFileSync('json.json', jsonBruger);
       res.status(200).send(true);
       } else {
               console.log('Email er brugt')
               res.status(404).end()
       }
}


// logge ind på hjemmesiden \\\
function login(email, password, res) {
// her laver jeg en const som går ind og læser min json fil 
    const allebrugere = fs.readFileSync('json.json');

// her bruger jeg parse til at lave mit json array om til et javascript array \\ 
    const parseBruger = JSON.parse(allebrugere)
// jeg har lavet et loop som skal loppe igennem min nye js array parseBruger og se om email allerde er brugt \\
    for(var i = 0; i < parseBruger.length; i++) {
        if (email === parseBruger[i].email && password === parseBruger[i].password) {
            res.send("login successfull")

            // her gemmer den emailen i variablen loginEmail som bliver gemt så man kan forblive logget ind \\
            loginEmail = email;
            return
        } 
    }
    res.status(401).end()
    return;

}

// her fjerner den indholdet i variablen loginEmail så man bliver logget ud \\
function logout(res) {
    loginEmail = ""
    res.send(' Du er nu logget ud ')
    return;
}

// functionen til at slette sin bruger \\

function deleteUser(res) {
// her laver igen en const som går ind og læser min json fil \\
    const allebrugere = fs.readFileSync('json.json');
//lave mit json array om til et javascript array \\ 
    const parseBruger = JSON.parse(allebrugere)
 // her laver jeg en variable som er = false hvilket bruges efterfølgende.
    let found = false

    // jeg laver et loop som går ind og sammensætter den email jeg er logget ind med og det sted den er i min json fil \\
    for (var i = 0; i < parseBruger.length; i++) {
        if(loginEmail === parseBruger[i].email) {
            // bruger splice til at fjerne brugeren som passer med emailen //
            parseBruger.splice(i, 1);
            found = true
            // og herefter fjernes den også fra variablen som går vi forbliver logget ind \\
            loginEmail = ""
        }
    }
    if (found === true) {
       // her hvis found er lige med true bruger jeg JSON.stringify og sender den nye sting tilbage til min json.json fil \\
        const jsonBruger = JSON.stringify(parseBruger)
        fs.writeFileSync('json.json', jsonBruger);
          res.send("Bruger slettet");
    } else {
        res.send("Kunne ikke slette bruger ")
    }
}



function updateBruger(user, res) {

    //går ind og læser min json fil \\
    const allebrugere = fs.readFileSync('json.json');

//lave mit json array om til et javascript array \\ 
    const parseBruger = JSON.parse(allebrugere)

// looper igen igennem min const og finder en email som passer med loginEmail \\
    for(var i = 0; i < parseBruger.length; i++) {
        if(loginEmail === parseBruger[i].email) {
            // her ved hjælp af if statment kan jeg ændre de forskellige brugers oplysninger\\
            // samt lagde dem forblive tomme så de forbliver det samme \\
            if(user.email == "") {
                user.email = parseBruger[i].email;
            }


            if(user.password == "") {
                user.password = parseBruger[i].password;
            }

            if(user.navn == "") {
                user.navn = parseBruger[i].navn;
            }
            
            // bruger igen splice til at fjerne brugeren \\
            parseBruger.splice(i, 1);
            // her pusher jeg den nye bruger ind \\
            parseBruger.push(user);
            // og bliver tilføjet til json.json her \\
            const jsonBruger = JSON.stringify(parseBruger)
            fs.writeFileSync('json.json', jsonBruger);

            res.send("Brugeren er opdateret");
            return;

    
        }
    }
    res.status(401).end();
}


////////// product functioner \\\\\\\\\\\\\\


// laver et nyt produkt \\
function newProduct (Product, res) {

    // for at sammensætte brugerne med produktet har jeg lavet en ejer email som bliver sat sammen med den bruger som er logget ind \\
    Product.ownerEmail = loginEmail;

    //går ind og læser min json fil \\
    const allebrugere = fs.readFileSync('json.json');

    //lave mit json array om til et javascript array \\ 
    var parseBruger = JSON.parse(allebrugere)
//variable til at se om mit produkt bliver gemt hos brugeren \\
    var saveProduct = false;

// loop som skal finde den bruger som passer med loginEmail \\
    for(var i = 0; i < parseBruger.length; i++) {
        if(loginEmail === parseBruger[i].email) {
            // her pusher jeg det nye product ind i items under brugeren som jeg er logget ind med \\ 
            parseBruger[i].item.push(Product)
            const jsonBruger = JSON.stringify(parseBruger);
            fs.writeFileSync('json.json', jsonBruger);

           
            saveProduct = true;
        }
    } 
    // her tilfæjer jeg den til min anden json fil så der er et sted med alle produkter samlet \\
    if (saveProduct === false) {
        res.status(401).end()
        return;
    } else  {
        
        //går ind og læser min json fil med produkterne \\
        const product = fs.readFileSync('product.json');

        //lave mit json array om til et javascript array \\ 
        const parseBruger = JSON.parse(product);

       // her pusher jeg produktet ind i mit array 
        parseBruger.push(Product)

       // og bliver tilføjet til json.json her \\
        const productJson = JSON.stringify(parseBruger)
        fs.writeFileSync('product.json', productJson);
      
        res.send("Nyt produkt lavet")
        return;
    }
}

// her er min function til updateproduct \\
function updateProduct(updatedProduct, res) { 
    
// her finder jeg de produkter som er ownerEmailen som passer med loginEmail \\ 
    updatedProduct.ownerEmail = loginEmail;

    //går ind og læser min json fil til produkterne \\
    const products = fs.readFileSync('product.json');

    //lave mit json array om til et javascript array \\ 
    const parsedProduct = JSON.parse(products);
    
// looper igennem mine produkter for at finde produkt id som passer med det produkt som skal ændres \\
    for(var i = 0; i < parsedProduct.length; i++) {
        if(updatedProduct.Id === parsedProduct[i].Id) {

            // her kan jeg nu ændre produktet på samme måde som jeg kunne med burgeren \\
            if(updatedProduct.title == "") {
                updatedProduct.title = parsedProduct[i].title;
            }

            if(updatedProduct.category == "") {
                updatedProduct.category = parsedProduct[i].category;
            }

            if(updatedProduct.price == "") {
                updatedProduct.price = parsedProduct[i].price;
            }
            // bruger splice til at slette det gamle produkt \\
            parsedProduct.splice(i, 1);

            // pusher det nye produkt ind og tilfæjer det til json filen \\
            parsedProduct.push(updatedProduct);
            const productJson = JSON.stringify(parsedProduct);
            fs.writeFileSync('product.json', productJson);
            
        }
    }
    // herefter tilføjer jeg det updateret produkt til brugeren \\

    
    const allebrugere = fs.readFileSync('json.json');

    const parseBruger = JSON.parse(allebrugere);

    // loop for at finde den bruger som er logget ind \\
    for(var i = 0; i < parseBruger.length; i++) {

        if(loginEmail === parseBruger[i].email) {

            for(var o = 0; o < parseBruger[i].item.length; o++) {
                // her finder jeg et produkt id som passer med det updateret produkt \\
                if(parseBruger[i].item[o].Id === updatedProduct.Id) {

                    // sletter det gamle produkt og pusher det updateret produkt ind \\
                    parseBruger[i].item.splice(o, 1);
                    parseBruger[i].item.push(updatedProduct);
                    
                }
            }
        }
    }

    const jsonBruger = JSON.stringify(parseBruger);

    fs.writeFileSync('json.json', jsonBruger);
            
    res.send("Produktet er opdateret ");

    return;
}

// her er funktionen til startsiden hvor man kan se alle producterne \\

function allProducts(res) {
    
    let rawData = fs.readFileSync('product.json');
    const parsedData = JSON.parse(rawData);

    
    res.send(parsedData);
    return;
}


// funktionen til at se den enkelte brugers produkter\\
function allMyProducts(res) {

    const Products = fs.readFileSync('product.json');

    const parsedProduct = JSON.parse(Products);
// har lavet et array som er tomy 
    var myProducts = [];

    // loopet her er til at finde den burger som er looget ind produckter 
    for(let i = 0; i < parsedProduct.length; i++) {
        if(parsedProduct[i].ownerEmail === loginEmail) {
            myProducts.push(parsedProduct[i]);
        }
    }
    res.send(myProducts);
    return;

}

function deleteProduct(Id, res) {

    let saveProduct = false;

//går ind og læser min json fil med produkterne \\
    const allProducts = fs.readFileSync('product.json');

//lave mit json array om til et javascript array \\ 
    const parsedProducts = JSON.parse(allProducts);

    // looper ignnem mit array \\
    for(var i = 0; i < parsedProducts.length; i++) {
       // finder produket i arrayet med samme Id \\
        if(Id === parsedProducts[i].Id) {

           // fjerner produktet med hjælp af splice \\
            parsedProducts.splice(i, 1);
            
         // jeg tilføjer arrayet tilbage til product.json \\
            const jsonProducts = JSON.stringify(parsedProducts);
            fs.writeFileSync('product.json', jsonProducts);
            saveProduct = true;
        }
    }

    if (saveProduct === false) {
        res.status(401).end()
        return;
    } else {
        // her henter jeg brugerne \\
        const allUsers = fs.readFileSync('json.json');

        
        var parsedUsers = JSON.parse(allUsers);

       // looper igennem brugerne for at finde den som er logget ind \\ 
        for(var i = 0; i < parsedUsers.length; i++) {
      
            if(loginEmail === parsedUsers[i].email) {

                // nyt loop som finder produktet med samme id som det er bliver slettet \\
                for(var j = 0; j < parsedUsers[i].item.length; j++) {
                   
                    if(Id ===  parsedUsers[i].item[j].Id) {

                        // sletter producktet under brugeren \\
                        parsedUsers[i].item.splice(j, 1);

                       // tilføjer arrayet tilbage til json.json \\
                        const jsonUsers = JSON.stringify(parsedUsers);
                        fs.writeFileSync('json.json', jsonUsers);
                        res.send("Du har slettet dit produkt");
                        return;
                    }
                }
            } 
        }
        res.status(401).end()
        return;
    } 
}



module.exports = {saveUser,login, authentication, loginEmail, logout, deleteUser, updateBruger, newProduct,updateProduct, allMyProducts,deleteProduct, allProducts}