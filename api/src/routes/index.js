var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    return res.status(200).json({ title: 'Express' });
});

module.exports = router;
