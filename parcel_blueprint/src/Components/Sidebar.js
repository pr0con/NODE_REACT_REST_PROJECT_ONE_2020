import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppProvider.js';

const StyledSidebar = styled.div`
	height: calc(100vh - 5rem);
	background-image: linear-gradient(#251829, #0f0f1b);
	
	display: flex;
	flex-direction: column;	
`;

import { SidebarProfile } from './SidebarProfile.js';

export function Sidebar() {
	const { user } = useContext(AppContext);
	
	return(
		<StyledSidebar >
			{ user.user !== null && <SidebarProfile /> }
		</StyledSidebar>
	)
}