import React from 'react';
import styled from 'styled-components';
import Logo from '../images/EB.png';

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

const Title = styled.h1.attrs(props => ({
    color: props.color || 'black',
}))`
    margin: 0;
    padding: 0;
    color: ${props => props.color};
`;

const StyledImage = styled.img`
    width: auto;
    height: 40px;
`;

const Bar = prop => {
    return (
        <StyledBar>
            <StyledImage src={Logo} />
            <Title color="#329696">Ether</Title>
            <Title>Bet</Title>
        </StyledBar>
    );
};

export default Bar;
