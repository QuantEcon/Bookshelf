/**
 * Created by tlyon on 5/26/17.
 */
// modules ======================================================
var mongoose = require('mongoose');
var config = require('./_config');
const maxNumTries = 5

// config =======================================================
const options = {
    useMongoClient: true,
    autoReconnect: true,
    reconnectTries: 5,
    reconnectInterval: 2000
}

connect = (numTry) => {
    if (numTry >= maxNumTries) {
        console.error("\nERROR: Couldn't connect to mongo\n");
    } else {
        console.log("Connecting...(" + numTry + ")")
        mongoose.connect(config.url, options).then(
            () => {
                console.log("\nConnected to database!\n")
            },
            err => {
                console.log("\nError connecting to mongo: ", err.message)
                console.log("Trying again in 2 seconds...\n")
                setTimeout(() => {
                    connect(numTry+1)
                }, 2000);
            }
        )
    }
}

connect(0);