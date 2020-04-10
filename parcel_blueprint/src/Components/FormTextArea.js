import React from 'react';
import styled from 'styled-components';

const StyledFormTextArea = styled.div`
	.form-text-area {
		background: rgba(86, 186, 202, .05);
		width: 100%;
		border: 0px;
		color: #5d858d;
		
		padding: 1rem;
	}
`;

export function FormTextArea({ name, placeholder, onChange }) {
	return(
		<StyledFormTextArea>
			<textarea className="form-text-area" name={name} placeholder={placeholder} onChange={onChange} rows="5" />
		</StyledFormTextArea>
	)
}