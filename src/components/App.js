import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card.js";
import Bar from "./Bar.js";

const StyledApp = styled.div`
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
`;

const StyledCardContainer = styled.div`
	margin: auto auto;
	width: 50%;
	height: 95%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const App = () => {
	return (
		<StyledApp className="App">
			<Bar />
			<StyledCardContainer>
				<Card name="NBA"></Card>
				<Card name="NHL"></Card>
				<Card name="LCS"></Card>
			</StyledCardContainer>
		</StyledApp>
	);
};

export default App;
