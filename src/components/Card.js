import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	height: 18em;
	width: 14em;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	position: relative;
	-webkit-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
	-o-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
	border-radius: 16px;
	overflow: hidden;
	background: #329696;

	-webkit-box-shadow: 15px 15px 27px black, -15px -15px 27px black;
	box-shadow: 15px 15px 27px black, -15px -15px 27px black;
	color: white;
`;

const Card = ({ name }) => {
	return <StyledCard> {name} </StyledCard>;
};

export default Card;
