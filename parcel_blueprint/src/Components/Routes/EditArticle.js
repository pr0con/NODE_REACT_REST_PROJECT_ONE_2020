import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledEditArticle = styled.div`
	
`

export function EditArticle({ location, match }) {
	
	useEffect(() =>{
		console.log(match);
	}, []);
	
	return(
		<StyledEditArticle className="master-content-page edit-article">
			Edit Article
		</StyledEditArticle>
	)
}