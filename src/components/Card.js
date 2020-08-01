import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	background: blue;
`;

const Card = ({ name }) => {
	return <StyledCard>{name}</StyledCard>;
};

export default Card;
