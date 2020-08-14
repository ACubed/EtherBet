import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledSchedule = styled.div`
    margin: 15px;
    height: 350px;
    width: 250px;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background-image: url(${props => props.bg});
    background-position: center;
    box-shadow: 15px 15px 27px black, -15px -15px 27px black;

    transition: 0.4s;
    filter: grayscale(95%) brightness(80%);
    :hover {
        filter: grayscale(0%);
    }
`;
const StyledLogo = styled.img`
    width: 100%;
`;
let upcoming = {};
axios
    .get('http://localhost:4000/league')
    .then(res => {
        upcoming = res.data;
    })
    .catch(err => {
        console.log(err);
    });

const Schedule = ({ league, src, bg }) => {
    return (
        <StyledSchedule bg={bg}>
            <StyledLogo src={src}></StyledLogo>
        </StyledSchedule>
    );
};

export default Schedule;
