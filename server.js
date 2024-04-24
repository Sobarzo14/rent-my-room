const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());
const port = 3000;


// GET: Retrieve the reservation info (if they have one) for a given user.
// GET: Get a list of reservations for all users.

app.get("/getAll", (req,res) => {
    fs.readFile("reservations.json", (err, data) => {
        let json = JSON.parse(data);
        res.send(json)
        for (let i = 0; i < json.length; i++) {
            const element = json[i];
        }
    })
});

app.get("/getReservation/:username", (req , res) => {
    let user = req.params.username
    fs.readFile("reservations.json", (err, data) => {
        let json = JSON.parse(data);
        for (let i = 0; i < json.length; i++) {
            const element = json[i];
            if (element.user == user){
                res.send(element)
            }
        }
    })
});

app.get("/getReservation/", (req , res) => {
    res.send("Please provide a username")
});

// POST: Add a username to the system (no password or auth required)
// POST: Create a reservation for a given user. It should specify username, start date, start time, and number of hours

app.post("/addUser/:user", (req , res) => {
    let username = req.params.user
    let addedUser = {
        user: username,
        reservation: null
    }
    fs.readFile("reservations.json", (err, data) => {
        let json = JSON.parse(data);
        json.push(addedUser);    
        fs.writeFile("reservations.json", JSON.stringify(json), (err) =>{
            if (err) throw err;
        });
    });
})

app.post("/createReservation/:user/:date/:time/:hours", (req , res) => {
    let user = req.params.user
    let date = req.params.date
    let time = req.params.time
    let hours = req.params.hours
    let addedReservation = {
        date: date,
        time: time,
        hours: hours
    }
    fs.readFile("reservations.json", (err, data) => {
        let json = JSON.parse(data);
        let exists = false;
        for (let i = 0; i < json.length; i++) {
            const element = json[i];
            if (element.user == user){
                element.reservation = addedReservation    
                fs.writeFile("reservations.json", JSON.stringify(json), (err) =>{
                    if (err) throw err;
                });
                exists = true;
            }
        }
        if (!exists) {
            res.send("User doesnt exist")
        }
    });
})

// PUT: Update a reservation for a given user. It should specify username, start date, start time, and number of hours
app.put("/updateReservation/:user/:time/:date/:hours", (req, res) => {
    let user = req.params.user
    let date = req.params.date
    let time = req.params.time
    let hours = req.params.hours
    let addedReservation = {
        date: date,
        time: time,
        hours: hours
    }
    fs.readFile("reservations.json", (err, data) => {
        console.log(data);
        let json = JSON.parse(data);
        let exists = false;
        for (let i = 0; i < json.length; i++) {
            const element = json[i];
            if (element.user == user){
                element.reservation = addedReservation    
                fs.writeFile("reservations.json", JSON.stringify(json), (err) =>{
                    if (err) throw err;
                });
                exists = true;
            }
        }
        if (!exists) {
            res.send("User doesnt exist")
        }
    });
});
// DELETE: Delete a reservation for a given user
app.delete("/deleteReservation/:user", (req, res) => {
    let user = req.params.user
    fs.readFile("reservations.json", (err, data) => {
        console.log(data);
        let json = JSON.parse(data);
        let exists = false;
        for (let i = 0; i < json.length; i++) {
            const element = json[i];
            if (element.user == user){
                element.reservation = null    
                fs.writeFile("reservations.json", JSON.stringify(json), (err) =>{
                    if (err) throw err;
                });
                exists = true;
            }
        }
        if (!exists) {
            res.send("User doesnt exist")
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

