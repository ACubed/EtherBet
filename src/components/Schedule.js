import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GameInfo from './GameInfo';

const Container = styled.div`
    z-index: 10;
    height: 80%;
    width: 80%;
    overflow: visible;
    border-radius: 16px;
    opacity: 0.8;
    background: black;
    position: absolute;
    box-shadow: 15px 15px 27px black, -15px -15px 27px black;
`;

const GamesContainer = styled.div`
    width: 100%;
    height: 80%;
`;

const StyledLogo = styled.img`
    width: 50px;
    height: 50px;
`;
const StyledButton = styled.button`
    background: white;
    width: 50px;
    height: 20px;
`;
const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Schedule = ({ league, src, close }) => {
    const [games, setGames] = useState([]);

    const getSchedule = league => {
        axios
            .get(`http://localhost:4000/league/${league}`)
            .then(res => {
                setGames(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getSchedule(league);
    }, []);

    useEffect(() => {
        getSchedule(league);
    }, [league]);
    return (
        <Container name="Schedule">
            <LogoContainer>
                <StyledButton onClick={close}>Close</StyledButton>
                <StyledLogo src={src}></StyledLogo>
            </LogoContainer>
            <GamesContainer>
                {games.map(game => (
                    <GameInfo game={game}></GameInfo>
                ))}
            </GamesContainer>
        </Container>
    );
};

export default Schedule;
