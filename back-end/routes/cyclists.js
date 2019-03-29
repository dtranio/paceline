const router = require('express').Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User.find()
        .populate("friends")
        .populate("joined_groups")
        .then(users => {
            res.json(users);
        });
});

router.get('/:cyclistId', (req, res) => {
    User.findById(req.params.cyclistId)
        .populate("friends")
        .populate("joined_groups")
        .populate({
            path: "joined_groups",
            populate: {
                path: "bike_route"
            }  
        })
        .then(user => {
            res.json(user);
        });
});

// Remove or add as a friend
router.put('/:cyclistId', (req, res) => {
    if (req.body.friendAction === "remove") {
        User.update(
            { _id: req.body.user}, 
            { $pull: { friends: req.params.cyclistId}},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
        User.update(
            { _id: req.params.cyclistId}, 
            { $pull: { friends: req.body.user}},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
        res.send("Friendship Removed")
    }
    else if (req.body.friendAction === "add") {
        User.update(
            { _id: req.body.user}, 
            { $push: { friends: req.params.cyclistId}},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
        User.update(
            { _id: req.params.cyclistId}, 
            { $push: { friends: req.body.user}},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
        res.send("Added Friend")
    }
});

module.exports = router;