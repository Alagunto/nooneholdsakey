var express = require('express');
var utilities = require('../utils');
var router = express.Router();
var models = require("../models");

/* GET users listing. */
router.get('/', function(req, res, next) {
    var token = req.query.token;
    var operator = models.operator.find({
        "token": token
    }, function(err, ans) {
        console.log(err, ans);
        if(err)
            res.sendStatus(500);
        else {
            if(ans.length > 0)
                res.json(ans[0]);
            else
                res.sendStatus(404);
        }
        res.end();
    });
}).post('/', function(req, res, next) {
    var secret_token = req.body.token;

    if(secret_token != "136fbadf-a21e-4a82-ab58-366895e1922b")
        res.sendStatus(403);
    else {
        var guid = utilities.guid();
        var operator = new models.operator({
            "name": req.body.name,
            "token": guid
        });
        operator.save(function(err) {
            if (err) {
                console.error("Error while saving new operator", err);
                res.sendStatus(500);
            } else {
                res.send(guid);
            }
            res.end();
        });
    }
});

module.exports = router;
