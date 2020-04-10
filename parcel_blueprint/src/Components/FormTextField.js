import React from 'react';
import styled from 'styled-components';

const StyledFormTextField = styled.div`
	display: flex;
	flex-direction: column;
	
	width: 100%;
	color: #597e87;	
	
	.form-text-field-label{
		height: 4rem;
		line-height: 4rem;
	}
	.form-text-field-text-input {
		min-height: 4rem;
		border: 1px solid #2d3c41;
		
		background: transparent;
		color: #597e87;
		text-indent: .5rem;
	}
`;

export function FormTextField({ name, label = "", role, placeholder, onChange, inputClasses }) {
	return(
		<StyledFormTextField>
			{ label != "" && <div className="form-text-field-label">{label}</div> }
			<input type={role} placeholder={placeholder} className={`form-text-field-text-input ${inputClasses}`} name={name} onChange={onChange}/>			
		</StyledFormTextField>	
	)
}