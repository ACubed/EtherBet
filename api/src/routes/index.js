var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    return res.status(200).json({ title: 'express' });
});

router.get('/session/:id', (req, res, next) => {
    let sessionId = req.params.id;
    //get both the teams playing, the league and the block address
    return res.status(200).json({ title: sessionId });
});

router.get('/history', (req, res, next) => {
    return res.status(200).json({ history: '' });
});

module.exports = router;
