const router = require('express').Router();
const GroupRide = require('../models/GroupRide');
const User = require('../models/User');

router.get('/', (req, res) => {
    GroupRide.find()
        .populate("attending")
        .populate("bike_route")
        .populate("created_by")
        .then(groups => {
            res.json(groups);
        })
        .catch(error => {
            console.log(error);
        });
});

// Create new group ride
router.post('/', (req, res) => {
    let newGroup = GroupRide({
        group_name: req.body.groupName,
        description: req.body.groupDescription,
        meetup_date: req.body.meetupDate,
        meetup_spot: req.body.meetupSpot,
        attending: [
            req.body.leader
        ],
        bike_route: req.body.routeSelected,
        created_by: req.body.leader
    });
    newGroup.save()
        .then(saved => {
            console.log(saved._id)
            User.update(
                { _id: req.body.leader }, 
                { $push: { joined_groups: saved._id }},
                function (error, success) {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        console.log(success)
                    }
                }
            );
            res.json(saved)
        })
        .catch(error => {
            console.log(error);
        });
});

// Deleting a group
router.delete('/:groupId/delete', (req, res) => {
    for (let user of req.body) {
        User.update(
            { _id: user._id }, 
            { $pull: { joined_groups: req.params.groupId }},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
        GroupRide.remove(
            { _id: req.params.groupId }, 
            function(error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
    }
    res.send("Deleted")
});

router.get('/:groupId', (req, res) => {
    GroupRide.findById(req.params.groupId)
        .populate("attending")
        .populate("bike_route")
        .populate("created_by")
        .then(group => {
            res.json(group);
        })
        .catch(error => {
            console.log(error)
        });
});

// Inviting user's friends to the bike ride
router.put('/:groupId/invite', (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        GroupRide.update(
            { _id: req.params.groupId }, 
            { $push: { attending: req.body[i] }},
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
            { _id: req.body[i] }, 
            { $push: { joined_groups: req.params.groupId }},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
    }
    res.send("Friends Invited");
})

// Joining and leaving group ride
router.put('/:groupId', (req, res) => {
    if (req.body.groupAction === "leave") {
        GroupRide.update(
            { _id: req.params.groupId }, 
            { $pull: { attending: req.body.user }},
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
            { _id: req.body.user }, 
            { $pull: { joined_groups: req.params.groupId }},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
        res.send("Left Group")
    }
    else if (req.body.groupAction === "join") {
        GroupRide.update(
            { _id: req.params.groupId }, 
            { $push: { attending: req.body.user }},
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
            { _id: req.body.user}, 
            { $push: { joined_groups: req.params.groupId }},
            function (error, success) {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(success)
                }
            }
        );
        res.send("Joined Group")
    }
});

module.exports = router;