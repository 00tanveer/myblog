var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
var User = require('../models/user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.post('/register', function(req, res) {
    console.log('here');
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        //email: req.body.email,
        password: hashedPassword
    }, function(err, user) {
        if (err) {
            return res.status(500).send("There was a problem registering the user.");
        }

        // create a token
        var token = jwt.sign({ id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        })

        res.status(200).send({ auth: true, token: token});
    });
});

router.post('/login', function(req, res) {
    console.log(req.body.username);
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            return res.status(500).send('Error on the server');
        }
        if (!user) {
            return res.status(404).send('No user found');
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password,
            user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                auth: false,
                token: null
            })
        }

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token});
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null});
});

//example to protect a route
/*
* router.get('/me', verifyToken, function(req, res, next) {
     User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
})
*/
module.exports = router;