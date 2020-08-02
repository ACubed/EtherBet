import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card.js";

const StyledApp = styled.div`
	margin: auto;
	height: 100%;
	width: 100%;
`;

const StyledCardContainer = styled.div`
	margin: auto auto;
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const App = () => {
	return (
		<StyledApp className="App">
			<StyledCardContainer>
				<Card name="NBA"></Card>
				<Card name="NHL"></Card>
				<Card name="LCS"></Card>
			</StyledCardContainer>
		</StyledApp>
	);
};

export default App;
