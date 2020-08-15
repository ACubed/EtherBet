import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './Card.js';
import Bar from './Bar.js';
import LOGO_NBA from '../images/icon_nba.png';
import LOGO_NHL from '../images/icon_nhl.png';
import LOGO_LCS from '../images/icon_lcs.png';
import BG_NBA from '../images/card_bg_nba.png';
import BG_NHL from '../images/card_bg_nhl.png';
import BG_LCS from '../images/card_bg_lcs.png';
import axios from 'axios';
import Schedule from './Schedule.js';
import BetForm from './BetForm.js';

const StyledApp = styled.div`
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

const StyledCardContainer = styled.div`
    margin: auto auto;
    width: 50%;
    height: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const StyledSchedule = styled(Schedule)``;
const App = () => {
    const [text, setText] = useState('HE L L OOOO');
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [leagueOpen, setLeagueOpen] = useState('NHL');
    const [logoOpen, setLogoOpen] = useState();

    const options = {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:4000/',
        },
    };

    axios
        .get('http://localhost:4000/')
        .then(res => {
            setText(res.data);
        })
        .catch(err => {
            console.log(err);
        });

    const openSchedule = league => {
        console.log(league);
        setScheduleOpen(true);
        setLeagueOpen(league);
        if (league === 'NHL') setLogoOpen(LOGO_NHL);
        else if (league === 'LCS') setLogoOpen(LOGO_LCS);
        else setLogoOpen(LOGO_NBA);
    };

    const closeSchedule = () => {
        setScheduleOpen(false);
    };

    return (
        <StyledApp className="App">
            <Bar />
            <h1>{text['title']}</h1>
            <StyledCardContainer>
                <Card
                    onClick={e => openSchedule(e.target.name)}
                    name="NBA"
                    src={LOGO_NBA}
                    bg={BG_NBA}
                />
                <Card
                    onClick={e => openSchedule(e.target.name)}
                    name="NHL"
                    src={LOGO_NHL}
                    bg={BG_NHL}
                />
                <Card
                    onClick={e => openSchedule(e.target.name)}
                    name="LCS"
                    src={LOGO_LCS}
                    bg={BG_LCS}
                />
                {scheduleOpen && (
                    <Schedule
                        close={closeSchedule}
                        league={leagueOpen}
                        src={logoOpen}></Schedule>
                )}
            </StyledCardContainer>
            <BetForm></BetForm>
        </StyledApp>
    );
};

export default App;
