const MongoClient  = require('mongodb').MongoClient;
const url          = 'mongodb://localhost:27017';
let db             = null;

// connect to mongo
MongoClient.connect (url, {useUnifiedTopology: true}, function(err, client){
    console.log("connected successfully to the db server");

    // connect to
    db = client.db('Myproject');
});

// create user account 
function create(name,email,password) {
    return new Promise ((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// all users
function all() {
    return new Promise((resolve, reject) => {
        db.collection('users')
            .find({})
            .toArray(function(err, result) {
                err ? reject(err) : resolve(result);
            });
    });
}

// login
function login(email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        collection.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log("Database error:", err);
                reject(err);
            } else if (!user) {
                console.log("User not found for email:", email);
                reject(new Error("User not found"));
            } else {
                // For debugging, remove in production
                console.log("User found:", user);
                if (user.password === password) {
                    resolve(user);
                } else {
                    console.log("Password mismatch for user:", email);
                    reject(new Error("Incorrect password"));
                }
            }
        });
    });
}

module.exports = { create, all, login };
