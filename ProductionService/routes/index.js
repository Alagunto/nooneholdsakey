var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/status');
});

router.get('/status', function(req, res, next) {
  res.json({
    "running": true,
    "version": 1.0
  });
});

module.exports = router;