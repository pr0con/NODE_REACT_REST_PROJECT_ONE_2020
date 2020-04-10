import React, { useContext } from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { AppContext } from './AppProvider.js';

const StyledState = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	
	width: 0px;
	height: 0px;
	
	background: #fff;
	overflow: hidden;

	transition: all .2s;
	
	&.true {
		width: 100vw;
		height: 100vh;
		overflow: scroll;
	}
`

export function State() {
	const appState = useContext(AppContext);
	const { display } = useContext(AppContext);	
	
	return(
		<StyledState className={display.state}>
			<ReactJson src={appState} collapsed={false} />
		</StyledState>
	)
}