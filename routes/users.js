var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('workshopdb', ['users']);

/* GET users listing. */
router.get('/', function(req, res, next) {
    // send all users
    db.users.find(function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(data)
        }
    });
});

router.get('/:id', function(req, res, next) {
    // send one user
    var _id = req.params.id;

    db.users.findOne({
        '_id': mongojs.ObjectId(_id)
    }, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(data)
        }
    });
});

router.post('/', function(req, res, next) {
    var user = req.body;

    db.users.insert(user, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(data)
        }
    });
});

router.put('/:id', function(req, res, next) {
    // update one user
    var _id = req.params.id;
    var newUser = req.body;

    db.users.update({
        '_id': mongojs.ObjectId(_id)
    }, newUser, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(data)
        }
    });
});

router.delete('/:id', function(req, res, next) {
    // delete one user

    var _id = req.params.id;
    db.users.remove({
            '_id': mongojs.ObjectId(_id)
        },
        function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data)
            }
        });
});

module.exports = router;
