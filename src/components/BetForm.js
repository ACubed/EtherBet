import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import uuid from 'react-uuid';

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: black;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`;

const StyledInput = styled.input`
    width: 75%;
    margin: 20px;
    height: 40px;
`;

const StyledButton = styled.button`
    width: 50%;
    height: 30px;
`;

const StyledTitle = styled.h1`
    font-weight: 700;
    font-size: 20px;
    color: white;
`;
const StyledSelect = styled.select`
    width: 75%;
    margin: 20px;
    height: 40px;
`;

const StyledLabel = styled.label`
    font-weight: 500;
    font-size: 14px;
    color: white;
`;

const BetForm = ({ home, away, time }) => {
    const { form, onChange, onToggle } = useForm({
        address: '',
        team: '',
        amount: '',
    });

    const submitBet = (homeTeam, awayTeam, time, address, amount) => {
        let sessionId = time;
        for (let i = 0; i < homeTeam.length; i++) {
            sessionId += homeTeam.charAt(i);
        }
        for (let i = 0; i < awayTeam.length; i++) {
            sessionId += awayTeam.charAt(i);
        }
        console.log(sessionId);
        axios
            .post(`http://localhost:4000/session/${sessionId}`, {
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                time: time,
                pool: 0,
                result: 0,
            })
            .then(() =>
                axios.post(`http://localhost:4000/session/${sessionId}/bet`, {
                    team: homeTeam,
                    address: address,
                    amount: amount,
                })
            );
    };
    return (
        <Container>
            <StyledTitle>Place a bet</StyledTitle>
            <StyledLabel>Your wallet address:</StyledLabel>
            <StyledInput
                name="address"
                id="address"
                value={form.address}
                onChange={onChange}></StyledInput>
            <StyledLabel>Pick a team:</StyledLabel>
            <StyledSelect
                name="team"
                id="team"
                value={form.team}
                onChange={onChange}>
                <option>Home: {home}</option>
                <option>Away: {away}</option>
            </StyledSelect>
            <StyledLabel>Amount to bet in Ether:</StyledLabel>
            <StyledInput
                name="amount"
                id="amount"
                value={form.amount}
                onChange={onChange}></StyledInput>
            <StyledButton
                onClick={() =>
                    submitBet(home, away, time, form.address, form.amount)
                }>
                Submit Bet
            </StyledButton>
        </Container>
    );
};

export default BetForm;
