import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	height: 200px;
	width: 100px;
	border-style: solid;
`;

const Card = ({ name }) => {
	return <StyledCard> {name} </StyledCard>;
};

export default Card;
