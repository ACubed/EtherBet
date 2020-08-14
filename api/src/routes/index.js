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
        '0x6d0839A135ceF68D0C7e0a30aE8F69171469DF19'
    );
    addresses = await web3.eth.getAccounts().then(item => console.log(item));
    initialized = true;
};

async function createGame(timestamp, homeTeam, awayTeam) {
    contract.methods
        .setGame(timestamp, homeTeam, awayTeam)
        .send({
            from: '0x8356c1D05A0E27d275781e78f75Fa23D0C265175',
            gas: 1000000,
        })
        .then(
            console.log(
                `Successfully created game at ${timestamp} with ${homeTeam} vs ${awayTeam}`
            )
        );
}

async function setOutcome(winner) {
    await contract.methods
        .setOutcome(winner)
        .send({
            from: '0x8356c1D05A0E27d275781e78f75Fa23D0C265175',
            gas: 1000000,
        })
        .catch(err => console.log(`away: ${err}`));
}

const bet = async home => {
    if (home) {
        await contract.methods
            .betOnHome()
            .send({
                from: '0xa449B3e692BE0a00E38770dA76b5849ce829Db63',
                value: web3.utils.toWei('40', 'ether'),
                gas: 1000000,
            })
            .catch(err => console.log(`home: ${err}`));
    } else {
        await contract.methods
            .betOnAway()
            .send({
                from: '0x78947E82Dc7754601d6425630C95286cfbd0dC18',
                value: web3.utils.toWei('40', 'ether'),
                gas: 1000000,
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

    if (initialized) {
        await createGame(
            sesh.game.time,
            sesh.game.homeTeam,
            sesh.game.awayTeam
        );
    } else {
        await init_contract();
        await createGame(
            sesh.game.time,
            sesh.game.homeTeam,
            sesh.game.awayTeam
        );
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
        if (sessionArr.some(session => session.game.result > 0))
            return res.status(200).json({ title: 'Game Already ended' });

        if (sessionArr.some(session => session.game.homeTeam === teamName))
            bettingTeam = true;
        else if (sessionArr.some(session => session.game.awayTeam === teamName))
            bettingTeam = false;
        else return res.status(404).json({ title: 'team not found' });
        //we have the team we want to bet on
        //place a bet on the team

        if (initialized) {
            await bet(bettingTeam)
                .then(() => {
                    console.log('bet placed!');
                })
                .catch(err => console.log(`error making bet ${err}`));
        } else {
            await init_contract();
            await bet(bettingTeam)
                .then(() => {
                    console.log('bet placed!');
                })
                .catch(err => console.log(`error making bet ${err}`));
        }
        res.status(200);
        res.json(sessionArr);
        res.end();
        return res;
    } catch (err) {
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

router.get('/session/:id/outcome/:team', async (req, res) => {
    let sessionId = req.params.id;
    let teamName = req.params.team;
    let winningTeam;
    try {
        const sessionArr = await Session.find({ id: `${sessionId}` });
        if (sessionArr.some(session => session.game.homeTeam === teamName))
            winningTeam = 1;
        else if (sessionArr.some(session => session.game.awayTeam === teamName))
            winningTeam = 2;
        else if ('draw' === teamName) winningTeam = 3;
        else return res.status(404).json({ title: 'team not found' });
        //we have the team we want to bet on
        //place a bet on the team
        if (initialized) {
            await setOutcome(winningTeam)
                .then(() => {
                    console.log('set outcome!');
                })
                .catch(err => console.log(`error making bet ${err}`));
        } else {
            await init_contract();
            await setOutcome(winningTeam)
                .then(() => {
                    console.log('set outcome!');
                })
                .catch(err => console.log(`error making bet ${err}`));
        }
        await Session.update(
            { id: sessionId },
            { $set: { 'game.result': winningTeam } }
        );
        res.status(200);
        res.json(sessionArr);
        res.end();
        return res;
    } catch (err) {
        return res.status(404).json({ title: 'oops' });
    }
});
//after sharing a link, the user is joining here
router.post('/session/:id', async (req, res) => {
    let sessionId = req.params.id;
    try {
        const session = await Session.find({ id: `${sessionId}` });

        res.json(session);
        res.end();
    } catch (err) {
        return res.status(500).json({ title: 'oops' });
    }
    //get both the teams playing, the league and the block address
    return res.status(200).json({ title: sessionId });
});

//after sharing a link, the user is joining here
router.get('/session/:id', async (req, res) => {
    let sessionId = req.params.id;
    try {
        const session = await Session.find({ id: `${sessionId}` });

        res.json(session);
        res.end();
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
