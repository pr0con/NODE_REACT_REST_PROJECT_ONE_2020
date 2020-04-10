import React, { useState } from 'react';
import styled from 'styled-components';
import { useInputChange } from './Hooks/useInputChange.js';

const StyledCreatePost = styled.div`
	position: relative;
	width: 100%;
	
	border: 1px solid #2d2c3c;
	
	.post-desc-input,
	.post-tags-input {
		border-top: 0px;
	}
	
	.create-post-actions {
		border-top: 1px solid #2d2c3c;
		padding: 1rem;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		max-height: 5rem;
		
		svg {
			width: 2rem;
			height: 2rem;
		}
		
		svg:not(:first-child) {
			margin-left: .5rem;
		}
		
		.create-post-submit-button {
			max-width: 20rem;
		}
	}
	
`;

import { Button } from './Button.js';
import { FormTextField } from './FormTextField.js';
import { FormTextArea } from './FormTextArea.js';

export function CreatePost({ handlePostSubmit }) {
	const [ tags, setTags ] = useState([]);
	const [ createPostData, handleCreatePostChange ] = useInputChange();	
	
	return(
		<StyledCreatePost>
			<form>
				<FormTextField role="text"  name="title" placeholder="Title" onChange={handleCreatePostChange} />
				<FormTextField role="text"  name="description" placeholder="Description" onChange={handleCreatePostChange} inputClasses="post-desc-input"/>
				<FormTextField role="text"  name="tags" placeholder="Tags (Comma Seperated Values)" onChange={handleCreatePostChange} inputClasses="post-tags-input"/>
				<FormTextArea  name="body" placeholder="Type something..." onChange={handleCreatePostChange} />
				
				<div className="create-post-actions">
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-microphone fa-w-10 fa-2x"><path fill="currentColor" d="M160 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S64 42.98 64 96v160c0 53.02 42.98 96 96 96zM96 96c0-35.29 28.71-64 64-64s64 28.71 64 64v160c0 35.29-28.71 64-64 64s-64-28.71-64-64V96zm216 96h-16c-4.42 0-8 3.58-8 8v56c0 73.46-62.2 132.68-136.73 127.71C83.3 379.18 32 319.61 32 251.49V200c0-4.42-3.58-8-8-8H8c-4.42 0-8 3.58-8 8v50.34c0 83.39 61.65 156.12 144 164.43V480H72c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h176c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8h-72v-65.01C256.71 406.9 320 338.8 320 256v-56c0-4.42-3.58-8-8-8z" ></path></svg>					
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="camera" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-camera fa-w-16 fa-2x"><path fill="currentColor" d="M324.3 64c3.3 0 6.3 2.1 7.5 5.2l22.1 58.8H464c8.8 0 16 7.2 16 16v288c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h110.2l20.1-53.6c2.3-6.2 8.3-10.4 15-10.4h131m0-32h-131c-20 0-37.9 12.4-44.9 31.1L136 96H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48h-88l-14.3-38c-5.8-15.7-20.7-26-37.4-26zM256 408c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-208c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88z" ></path></svg>					
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-image fa-w-16 fa-2x"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V112c0-8.822 7.178-16 16-16h416c8.822 0 16 7.178 16 16v288zM112 232c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56 25.072 56 56 56zm0-80c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm207.029 23.029L224 270.059l-31.029-31.029c-9.373-9.373-24.569-9.373-33.941 0l-88 88A23.998 23.998 0 0 0 64 344v28c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-92c0-6.365-2.529-12.47-7.029-16.971l-88-88c-9.373-9.372-24.569-9.372-33.942 0zM416 352H96v-4.686l80-80 48 48 112-112 80 80V352z" ></path></svg>
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="paperclip" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-paperclip fa-w-16 fa-2x"><path fill="currentColor" d="M149.106 512c-33.076 0-66.153-12.59-91.333-37.771-50.364-50.361-50.364-132.305-.002-182.665L319.842 29.498c39.331-39.331 103.328-39.331 142.66 0 39.331 39.332 39.331 103.327 0 142.657l-222.63 222.626c-28.297 28.301-74.347 28.303-102.65 0-28.3-28.301-28.3-74.349 0-102.649l170.301-170.298c4.686-4.686 12.284-4.686 16.97 0l5.661 5.661c4.686 4.686 4.686 12.284 0 16.971l-170.3 170.297c-15.821 15.821-15.821 41.563.001 57.385 15.821 15.82 41.564 15.82 57.385 0l222.63-222.626c26.851-26.851 26.851-70.541 0-97.394-26.855-26.851-70.544-26.849-97.395 0L80.404 314.196c-37.882 37.882-37.882 99.519 0 137.401 37.884 37.881 99.523 37.882 137.404.001l217.743-217.739c4.686-4.686 12.284-4.686 16.97 0l5.661 5.661c4.686 4.686 4.686 12.284 0 16.971L240.44 474.229C215.26 499.41 182.183 512 149.106 512z" ></path></svg>				
					<div className="flex-row-filler"></div>
					<Button btype="generic" text="Post" onClick={(e) => handlePostSubmit(createPostData)} margin=".5rem 0 .5rem 0" classes="create-post-submit-button"/>
				</div>
			</form>
		</StyledCreatePost>
	)
}

