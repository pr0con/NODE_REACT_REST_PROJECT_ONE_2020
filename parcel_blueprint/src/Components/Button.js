import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
	width: 100%;
	
	height: 4rem;
	color: #54b1c1;
	font-size: 2rem;
	line-height: 4rem;
	text-align:center;
	background: linear-gradient(135deg, #343346, #2d3c41);
	
	&:hover{
		cursor:pointer;
	}	
	
	margin: ${props => props.margin};
	
	${({ btype, imgUrl  }) => (btype == "open-id-facebook" ||  btype == "open-id-twitter") && `
		display: flex;
		flex-direction: row;
		
		.open-id-image {
			min-width: 4rem;
			min-height: 4rem;			
			background-repeat: no-repeat, no-repeat;
			background-position: center center;
			background-image: url( ${imgUrl} );	
		}
	`}	

	${({ btype }) => btype == "open-id-facebook" && `
		.open-id-image {
			background-color: #206f90;
			background-size: 1.8rem 3.2rem;
		}
	`}
					
	${({ btype }) => btype == "open-id-twitter" && `
		.open-id-image {
			background-color: #329ecf;
			background-size: 3.2rem 2.6rem;
		}
	`}
	
	.button-text {
		width: 100%;
		text-align:center;
	}
`;

export function Button({ btype, text, onClick, margin, imgUrl, classes }) {
	
	const handleClick = () => {
		switch(btype) {
			case "something":
				break;
			default:
				onClick();
				break;
		}
	}
	
	return(
		<StyledButton onClick={(e) => handleClick()} margin={margin} btype={btype} className={classes} imgUrl={imgUrl}>
			{ ['open-id-facebook','open-id-twitter'].includes(btype) && 
				<div className="open-id-image"></div>
			}
			<div className="button-text">{ text }</div>
		</StyledButton>
	)
}