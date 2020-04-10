import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledArticle = styled.div`
	
`

export function Article({ location, match }) {
	/*
		window.location.pathname // /account/search
		window.location.host     // www.somedomain.com (includes port if there is one)
		window.location.hostname // www.somedomain.com
		window.location.hash     // #top
		window.location.href     // http://www.somedomain.com/account/search?filter=a#top
		window.location.port     // (empty string)
		window.location.protocol // http:
		window.location.search   // ?filter=a  	
	*/
	
	useEffect(() => {
		//console.log(window.location.pathname);
		//console.log(location)
		console.log(match);
	},[]);
	
	return(
		<StyledArticle className="master-content-page article">
			Article
		</StyledArticle>
	)
}