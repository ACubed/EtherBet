import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	height: 25%;
	width: 20%;
	display: flex;
	flex-direction: column;
	position: relative;
	border-radius: 16px;
	overflow: hidden;
	background: #329696;
	box-shadow: 15px 15px 27px black, -15px -15px 27px black;
	color: white;
`;

const Card = ({ name }) => {
	return <StyledCard> {name} </StyledCard>;
};

export default Card;
