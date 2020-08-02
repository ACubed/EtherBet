import React from "react";
import styled from "styled-components";
import Logo from "../EB.png";

const StyledBar = styled.div`
	margin: auto;
	height: 5%;
	width: 100%;
	display: flex;
	text-align: center;
	flex-direction: row;
	justify-content: center;
	position: relative;
	background: rgba(256, 256, 256, 0.07);
`;

const Title = styled.h1.attrs((props) => ({
	color: props.color || "black",
}))`
	margin: 0;

	color: ${(props) => props.color};
`;

const StyledImage = styled.img`
	width: 40px;
	height: auto;
`;

const Bar = ({}) => {
	return (
		<StyledBar>
			<StyledImage src={Logo} />
			<Title color="#329696">Ether</Title>
			<Title>Bet</Title>
		</StyledBar>
	);
};

export default Bar;
