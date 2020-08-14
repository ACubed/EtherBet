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

const BetForm = ({ home, away, time }) => {
    const { form, onChange, onToggle } = useForm({
        address: '',
        team: '',
        amount: '',
    });
    return (
        <Container>
            <StyledTitle>Place a bet</StyledTitle>
            <StyledInput
                name="address"
                id="address"
                value={form.address}
                onChange={onChange}></StyledInput>
            <StyledInput
                name="team"
                id="team"
                value={form.team}
                onChange={onChange}></StyledInput>
            <StyledInput
                name="amount"
                id="amount"
                value={form.amount}
                onChange={onChange}></StyledInput>
            <StyledButton>Submit Bet</StyledButton>
        </Container>
    );
};

export default BetForm;
