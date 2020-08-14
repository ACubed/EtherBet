const express = require('express');
const Session = require('../models/session');
const Web3 = require('web3');
const Bet = require('../../../build/contracts/Bet.json');

let web3;
let id;
let contract;
let addresses;
let initialized = false;

var router = express.Router();

const init_contract = () => {
    web3 = new Web3(`http://localhost:7545`);
    id = await web3.eth.net.getId().catch(err => console.log('after id'));
    contract = new web3.eth.Contract(
        Bet.abi,
        '0x438e1e43115Baf5d99002638272aCEC19e548556'
    );
    addresses = await web3.eth
        .getAccounts()
        .then(item => console.log(item));
}

const createGame = async (timestamp, homeTeam, awayTeam)=> {
    await contract.methods.setGame(timestamp, homeTeam, awayTeam).call().then(
        console.log(`Successfully created game at ${timestamp} with ${homeTeam} vs ${awayTeam}`)
    )    
}

const bet = async home => {
    if (home) {
        await contract.methods
            .betOnHome()
            .send({
                from: '0x2c58703f11b6bBB8A92dEA9903E777566f595E40',
                value: '1',
            })
            .catch(err => console.log(`home: ${err}`));
    } else {
        await contract.methods
            .betOnAway()
            .send({
                from: '0x2c58703f11b6bBB8A92dEA9903E777566f595E40',
                value: '3',
            })
            .catch(err => console.log(`away: ${err}`));
    }
};

router.get('/', (req, res) => {
    return res.status(200).json({ title: 'express' });
});

router.post('/session/:id', async (req, res) => {
    const sesh = new Session({
        id: req.params.id,
        game: {
            homeTeam: req.body.homeTeam,
            awayTeam: req.body.awayTeam,
            time: req.body.time,
            result: req.body.result,
        },
        pool: req.body.pool,
    });
    
    try {
        const newSesh = await sesh.save();
        res.status(200).json(newSesh);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/session/:id/bet/:team', async (req, res) => {
    let sessionId = req.params.id;
    let teamName = req.params.team;
    let bettingTeam;
    try {
        const sessionArr = await Session.find({ id: `${sessionId}` });
        if (sessionArr.some(session => session.game.homeTeam === teamName))
            bettingTeam = true;
        else if (sessionArr.some(session => session.game.awayTeam === teamName))
            bettingTeam = false;
        else return res.status(404).json({ title: 'team not found' });
        //we have the team we want to bet on
        //place a bet on the team
        console.log(`betting on home? ${bettingTeam}`);
        bet(bettingTeam)
            .then(() => {
                console.log('bet placed!');
            })
            .catch(err => console.log(`ERROR IN BET YO\n\n${err}:`));
        res.json(sessionArr);
        return res.status(200).json({ title: sessionId });
    } catch (err) {
        return res.status(500).json({ title: 'oops' });
    }
});


//after sharing a link, the user is joining here
router.get('/session/:id', async (req, res) => {
    let sessionId = req.params.id;
    try {
        const session = await Session.find({ id: `${sessionId}` });

        res.json(session);
    } catch (err) {
        return res.status(500).json({ title: 'oops' });
    }
    //get both the teams playing, the league and the block address
    return res.status(200).json({ title: sessionId });
});

router.get('/history', (req, res) => {
    return res.status(200).json({ history: '' });
});

module.exports = router;
