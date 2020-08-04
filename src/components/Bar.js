import React from 'react';
import styled from 'styled-components';
import Logo from '../images/ether_bet.png';

const StyledBar = styled.div`
    margin: auto;
    height: 40px;
    width: 100%;
    display: flex;
    text-align: center;
    flex-direction: row;
    justify-content: center;
    position: relative;
    background: rgba(256, 256, 256, 0.07);
`;

const StyledImage = styled.img`
    width: auto;
    height: 40px;
`;

const Bar = prop => {
    return (
        <StyledBar>
            <StyledImage src={Logo} />
        </StyledBar>
    );
};

export default Bar;
