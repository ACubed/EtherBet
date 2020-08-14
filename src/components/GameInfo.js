import React from 'react';
import styled from 'styled-components';

const StyledGameInfo = styled.div`
    height: 40%;
    width: 20%;
    background-color: black;
`;

const GameInfo = ({ home, away, time }) => {
    return (
        <StyledGameInfo>
            <h2>Home: {home}</h2>
            <h2>Away: {away}</h2>
            <h2>Time: {time}</h2>
        </StyledGameInfo>
    );
};

export default GameInfo;
