const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// Database Models
const User = require('./models/User');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({origin: 'http://localhost:3000'}));

mongoose.connect('mongodb://localhost:27017/paceline');

const connection = mongoose.connection;
connection.on('open', () => {
    console.log('Successfully Connected to MongoDB :)');

    // Back-end routes
    app.use("/cyclists", require("./routes/cyclists"));
    app.use("/groups", require("./routes/groups"));
    app.use("/bikeroutes", require("./routes/bikeroutes"));

    // Update user profile
    app.put("/editprofile", (req, res) => {
        User.update(
            { _id: req.body.user }, 
            { $set: { 
                first_name: req.body.updated_name,
                region: req.body.updated_region,
                bike_owned: req.body.updated_bikeOwned,
                bio: req.body.updated_description,
                email: req.body.updated_email,
                interests: req.body.updated_interests, 
            }},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
        User.findById(req.body.user)
            .populate("friends")
            .populate("joined_groups")
            .then(user => {
                res.json(user);
            });
    })

    app.listen(PORT, () => {
        console.log(`Listening on Port:${PORT}`);
    });
});