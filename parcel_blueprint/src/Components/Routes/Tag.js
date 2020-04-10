import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useFetch } from '../Hooks/useFetch.js';


const StyledTag = styled.div`
		
`;

export function Tag({ location, match }) {
	
	useEffect(() =>{
		console.log(match);
	}, []);	
	
	return(
		<StyledTag className="master-content-page tag">
			Tag
		</StyledTag>		
	)
}