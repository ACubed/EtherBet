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

const App = () => {
    const [text, setText] = useState('HE L L OOOO');

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

    return (
        <StyledApp className="App">
            <Bar />
            <h1>{text['title']}</h1>
            <StyledCardContainer>
                <Card name="NBA" src={LOGO_NBA} bg={BG_NBA} />
                <Card name="NHL" src={LOGO_NHL} bg={BG_NHL} />
                <Card name="LCS" src={LOGO_LCS} bg={BG_LCS} />
            </StyledCardContainer>
        </StyledApp>
    );
};

export default App;
