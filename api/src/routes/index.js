const express = require('express');
const Session = require('../models/session');
const Web3 = require('web3');
const Bet = require('../../../build/contracts/Bet.json');
const Stub = require('../../../data/stub.json');
const { create } = require('../models/session');

let web3;
let id;
let contract;
let addresses;
let initialized = false;

var router = express.Router();

const init_contract = async () => {
    web3 = new Web3(`http://localhost:7545`);
    id = await web3.eth.net.getId().catch(err => console.log('after id'));
    contract = new web3.eth.Contract(
        Bet.abi,
        '0x1eb8c75495545F577DDcE5bE8FC262072D83FBd6'
    );
    addresses = await web3.eth.getAccounts().then(item => console.log(item));
    initialize = true;
};

const createGame = async (timestamp, homeTeam, awayTeam) => {
    await contract.methods
        .setGame(timestamp, homeTeam, awayTeam)
        .call()
        .then(
            console.log(
                `Successfully created game at ${timestamp} with ${homeTeam} vs ${awayTeam}`
            )
        );
};

const bet = async home => {
    if (home) {
        await contract.methods
            .betOnHome()
            .send({
                from: '0x9a394b492F5C6cBb2E55f7371BE517274EC37EFC',
                value: '24',
            })
            .catch(err => console.log(`home: ${err}`));
    } else {
        await contract.methods
            .betOnAway()
            .send({
                from: '0x9a394b492F5C6cBb2E55f7371BE517274EC37EFC',
                value: '40',
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

    await init_contract().then(() => {});
    if (initialized) {
        await createGame(
            sesh.game.time,
            sesh.game.homeTeam,
            sesh.game.awayTeam
        );
    } else {
        await init_contract().then(() => {
            createGame(sesh.game.time, sesh.game.homeTeam, sesh.game.awayTeam);
        });
    }
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
        if (initialized) {
            await bet(bettingTeam)
                .then(() => {
                    console.log('bet placed!');
                })
                .catch(err => console.log(`ERROR IN THE BET EBT YOOOO ${err}`));
        } else {
            await init_contract().then(() => {
                bet(bettingTeam)
                    .then(() => {
                        console.log('bet placed!');
                    })
                    .catch(err =>
                        console.log(`ERROR IN THE BET EBT YOOOO ${err}`)
                    );
            });
        }
        res.json(sessionArr);
        return res.status(200).json({ title: sessionId });
    } catch (err) {
        console.log(`ERROR IN BET YO\n\n${err}`);
        return res.status(404).json({ title: 'oops' });
    }
});

router.get('/league/:name', async (req, res) => {
    let league = req.params.name;
    try {
        const upcomingGames = Stub[league];
        const schedule = [];
        upcomingGames.forEach(game => {
            if (game.outcome === '') {
                schedule.push(game);
            }
        });
        return res.status(200).json(schedule);
    } catch (err) {
        return res.status(500).json({ title: 'League not found' });
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
