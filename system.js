var fs = require('fs')



function saveuser(user, res){

    fs.readFile('json.json', (error, allebruger) => {

        if(error) {
            console.log("error",error)
        }else{
            const parsedUsers = JSON.parse(allebruger)

            let found = false;


            for (var i = 0; i < parsedUsers.length; i++){
                if(user.email === parsedUsers[i].email){

                    found = true;
                }
            }

            if(!found) {
                parsedUsers.push(user)
            
                const jsonBruger = JSON.stringify(parsedUsers)

                fs.writeFile("./json.json", jsonBruger, (error) => {
                if(error) {
                    console.log('en fejl', error);
                }else {
                    res.status(200).send(true);
                }
                })
            }else {
                console.log('brugeren er brugt')
                res.status(401).send(false);
            }
        }

    })

}

module.exports = {saveuser}