var express = require('express');
var router = express.Router();
var models = require('../models');
var utils = require('../utils');
var logic = require('../logic');

router
    .get('/', function(req, res, next) {
        var account_token = req.query.account_token;
        var operator_token = req.query.operator_token;
        models.account.find({
            "id": account_token,
            "operator": operator_token
        }, function(err, ans) {
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
    })
    .post('/', function(req, res, next) {
        var operator_token = req.body.operator_token;
        if(!req.body.password) {
            res.sendStatus(400);
            res.end();
        } else
        models.operator.find({
            "token": operator_token
        }, function(err, ans) {
            if(err) {
                res.sendStatus(500);
                res.end();
            }
            else {
                if(ans.length > 0)
                    createAccount();
                else {
                    res.sendStatus(403);
                    res.end();
                }
            }
        });

        function createAccount() {
            var account = new models.account({
                "id": utils.guid(),
                "password": req.body.password,
                "operator": operator_token,
                "avg_retention": null,
                "avg_between": null
            });
            account.save(function(err) {
                if(err)
                    res.sendStatus(500);
                else {
                    res.send(account.id);
                    console.log(account.id);
                }
                res.end();
            });
        }
    })
    .get("/writings", function(req, res, next) {
        var account_token = req.query.account_token;
        var operator_token = req.query.operator_token;

        models.account.find({
            "id": account_token,
            "operator": operator_token
        }, function(err, ans) {
            if(err) {
                res.sendStatus(500);
            } else {
                if(!ans.length) {
                    res.sendStatus(404);
                    res.end();
                } else {
                    sendWritings();
                }
            }
        });

        function sendWritings() {
            models.passwordWriting.find({
                "account": account_token
            }, function(err, ans) {
                if(err) {
                    res.sendStatus(500);
                    res.end();
                } else {
                    res.json(ans);
                }
            });
        }
    })
    .post("/writings", function(req, res, next) {
        var events = JSON.parse(req.body.events);
        var account = req.body.account_token;
        var operator = req.body.operator_token;

        models.account.find({
            "id": account,
            "operator": operator
        }, function(err, ans) {
            if(err) {
                res.sendStatus(500);
                res.end();
                console.error(err);
            } else {
                if(!ans.length) {
                    res.sendStatus(403);
                    res.end();
                } else {
                    addWriting(ans[0]);
                }
            }
        });

        function addWriting(acc) {
            var data = [];
            for(var event in events) {
                if(!events.hasOwnProperty(event))
                    continue;
                event = events[event];
                data.push({
                    "key": parseInt(event.key),
                    "ts_down": parseInt(event.ts_down),
                    "ts_up": parseInt(event.ts_up)
                });
            }

            var writings = new models.passwordWriting({
                events: data,
                account: account
            });

            console.log(writings);
            logic.newWritingsToAccount(writings, acc, function(scary) {
                if(scary !== false) {
                    writings.save(function (err) {
                        if (err) {
                            res.sendStatus(500);
                            res.end();
                            console.error(err);
                        }
                        else {
                            res.json({"scary":scary});
                            res.end();
                        }
                    });
                } else {
                    res.sendStatus(400);
                    res.end();
                    console.error("Invalid password entrance passed");
                }
            });

        }
    });

module.exports = router;
