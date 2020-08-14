import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GameInfo from './GameInfo';

const StyledSchedule = styled.div`
    margin: 15px;
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 15px 15px 27px black, -15px -15px 27px black;
`;
const StyledLogo = styled.img`
    width: 10%;
    height: 10%;
`;

const Schedule = ({ league, src }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getSchedule(league);
    }, []);

    useEffect(() => {
        getSchedule(league);
    }, [league]);

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
    return (
        <StyledSchedule>
            <StyledLogo src={src}></StyledLogo>
            {games.map(game => (
                <GameInfo game={game}></GameInfo>
            ))}
        </StyledSchedule>
    );
};

export default Schedule;
