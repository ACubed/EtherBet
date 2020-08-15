import React from 'react';
import styled from 'styled-components';
import useForm from '../hooks/useForm';

const Container = styled.div`
    height: 40%;
    width: 20%;
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
    height: 5%;
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

const GameContainer = styled.div`
    width: 80%;
    height: 10%;
    color: white;
`;

const BetForm = ({ home, away, time }) => {
    const { form, onChange, onToggle } = useForm({
        address: '',
        team: '',
        amount: '',
    });

    const submitBet = () => {};
    return (
        <Container>
            <StyledTitle>Place a bet</StyledTitle>
            <GameContainer>
                Home: {home} Away: {away} Time: {time}
            </GameContainer>
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
            <StyledLabel>Amount to bet in gwei:</StyledLabel>
            <StyledInput
                name="amount"
                id="amount"
                value={form.amount}
                onChange={onChange}></StyledInput>
            <StyledButton onClick={submitBet}>Submit Bet</StyledButton>
        </Container>
    );
};

export default BetForm;
