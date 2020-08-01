import React from "react";
import styled from "styled-components";
import Card from "./Card.js";

const StyledApp = styled.div`
	text-align: center;
`;

const App = () => {
	return (
		<StyledApp className="App">
			<Card name="yo"></Card>
			<Card name="23"></Card>
		</StyledApp>
	);
};

export default App;
