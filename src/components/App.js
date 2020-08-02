import React from "react";
import styled from "styled-components";
import Card from "./Card.js";
import Bar from "./Bar.js";
import NBALOGO from "../NBA_2020_Logo.png";
import LCSLOGO from "../LCS_2020_Logo.png";
import NHLLOGO from "../NHL_2020_Logo.png";

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
				<Card name="NBA" src={NBALOGO}></Card>
				<Card name="NHL" src={NHLLOGO}></Card>
				<Card name="LCS" src={LCSLOGO}></Card>
			</StyledCardContainer>
		</StyledApp>
	);
};

export default App;
