const router = require('express').Router();
const BikeRoute = require('../models/BikeRoute');

router.get('/', (req, res) => {
    BikeRoute.find()
        .then(routes => {
            res.json(routes);
        })
        .catch(error => {
            console.log(error);
        });
});

router.get('/:routeId', (req, res) => {
    BikeRoute.findById(req.params.routeId)
        .then(route => {
            res.json(route);
        })
        .catch(error => {
            console.log(error)
        });
});

module.exports = router;