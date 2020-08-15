import React, { useState } from 'react';
import styled from 'styled-components';
import BetForm from './BetForm';

const Container = styled.div`
    z-index: 10;
    margin: 10px;
    height: 40%;
    width: 25%;
    border-radius: 16px;
    opacity: 100%;
    background: black;
`;

const StyledGameInfo = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(256, 256, 256, 0.4);
    border-radius: 10%;
    padding: 5px;
    margin: 10px;
    color: white;
    z-index: 30;
`;

const convertToTime = timestamp => {
    let date = new Date(timestamp * 1000);
    return date.toUTCString();
};

const GameInfo = ({ game }) => {
    const [formOpen, setFormOpen] = useState(false);
    const toggleForm = () => {
        setFormOpen(!formOpen);
    };
    return (
        <Container>
            <StyledGameInfo onClick={toggleForm}>
                <h2>Home: {game.home}</h2>
                <h2>Away: {game.away}</h2>
                <h2>Time: {convertToTime(game.time_stamp)}</h2>
            </StyledGameInfo>
            {formOpen && (
                <BetForm
                    home={game.home}
                    away={game.away}
                    time={game.time_stamp}></BetForm>
            )}
        </Container>
    );
};

export default GameInfo;
