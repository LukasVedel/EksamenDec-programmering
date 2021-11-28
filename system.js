var fs = require('fs')



// variale som er tilkomlet til alle endpoint og min login funktion så man kun kan komme ind på bestemte sider hvis logget ind 
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


function saveUser(user, res) {
// læser min json fil.
    const allebrugere = fs.readFileSync('json.json');

// her ved hjælp af parse går jeg ind i min json fil og laver brugeren til et array. 
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
               console.log('user already exist')
               res.status(404).end()
       }
}


function login(email, password, res) {

    const allebrugere = fs.readFileSync('json.json');

    const parseBruger = JSON.parse(allebrugere)

    for(var i = 0; i < parseBruger.length; i++) {
        if (email === parseBruger[i].email && password === parseBruger[i].password) {
            res.send("login successfull")

            
            loginEmail = email;
            return
        } 
    }
    res.status(401).end()
    return;

}

function logout(res) {
    loginEmail = ""
    res.send('logged out successfull')
    return;
}

function deleteUser(res) {

    const allebrugere = fs.readFileSync('json.json');

    const parseBruger = JSON.parse(allebrugere)
    let found = false

    for (var i = 0; i < parseBruger.length; i++) {
        
        if(loginEmail === parseBruger[i].email) {
            
            parseBruger.splice(i, 1);
            found = true
            
            loginEmail = ""
        }
    }
    if (found === true) {
       
        const jsonBruger = JSON.stringify(parseBruger)
        fs.writeFileSync('json.json', jsonBruger);
          res.send("User deleted");
    } else {
        res.send("Could not delete user")
    }
}

function updateBruger(user, res) {
    const allebrugere = fs.readFileSync('json.json');

    const parseBruger = JSON.parse(allebrugere)


    for(var i = 0; i < parseBruger.length; i++) {
        if(loginEmail === parseBruger[i].email) {

            if(user.email == "") {
                user.email = parseBruger[i].email;
            }


            if(user.password == "") {
                user.password = parseBruger[i].password;
            }

            if(user.navn == "") {
                user.navn = parseBruger[i].navn;
            }
            
            parseBruger.splice(i, 1);
            parseBruger.push(user);
            const jsonBruger = JSON.stringify(parseBruger)
            fs.writeFileSync('json.json', jsonBruger);

            res.send("Succesfully updated user");
            return;

    
        }
    }
    res.status(401).end();
}



module.exports = {saveUser,login, authentication, loginEmail, logout, deleteUser, updateBruger}