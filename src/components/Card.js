import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	margin: 15px;
	height: 400px;
	width: 300px;
	display: flex;
	flex-direction: column;
	position: relative;
	border-radius: 16px;
	overflow: hidden;
	background: #329696;
	box-shadow: 15px 15px 27px black, -15px -15px 27px black;
	color: white;
	text-align: center;
`;
const StyledLogo = styled.img`
	width: auto;
	height: 200px;
`;
const StyledTitle = styled.h1`
	color: white;
`;
const Card = ({ name, src }) => {
	return (
		<StyledCard>
			<StyledLogo src={src}></StyledLogo>
			<StyledTitle> {name} </StyledTitle>
		</StyledCard>
	);
};

export default Card;
