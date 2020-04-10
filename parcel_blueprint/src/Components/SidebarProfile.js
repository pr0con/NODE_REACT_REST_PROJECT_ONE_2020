import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppProvider.js';
import { Link, NavLink } from 'react-router-dom';


const StyledSidebarProfile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	width: 100%;
	
	#sidebar-profile-image {
		margin-top: 3rem;
		width: 5rem;
		height: 5rem;
		border: 1px solid #322339;
	}
	#sidebar-profile-fullname {
		color: #f0f0f1;
		font-size: 2rem;
	}
	
	#sidebar-profile-location {
		font-size: 1.2rem;
		color: #527079;
		display: flex;
		flex-direction: row;
		align-items: center; 
		
		svg {
			color: #407585;
			width: .9rem;
			height: 1.2rem;		
		}
		#sidebar-profile-location-city {
			background: #2e2332;
			margin-left: .5rem;
		}
		#sidebar-profile-location-state {
			background: #2e2332;
			padding-left: .5rem;
		}
	}
	
`;

export function SidebarProfile() {
	const { user } = useContext(AppContext);
	
	return(
		<StyledSidebarProfile>
			<Link to={`/profiles/${user['user']['alias']}`}><img id="sidebar-profile-image" src={user.user.profile.url}/></Link>
			<div id="sidebar-profile-fullname">{ user.user.fullname }</div>
			<div id="sidebar-profile-location">
				<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="map-marker" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-map-marker fa-w-12 fa-2x"><path fill="currentColor" d="M192 0C85.961 0 0 85.961 0 192c0 77.413 26.97 99.031 172.268 309.67 9.534 13.772 29.929 13.774 39.465 0C357.03 291.031 384 269.413 384 192 384 85.961 298.039 0 192 0zm0 473.931C52.705 272.488 32 256.494 32 192c0-42.738 16.643-82.917 46.863-113.137S149.262 32 192 32s82.917 16.643 113.137 46.863S352 149.262 352 192c0 64.49-20.692 80.47-160 281.931z"></path></svg>				
				<span id="sidebar-profile-location-city">{ user.user.profile.location.city }</span>
				<span id="sidebar-profile-location-state">{ user.user.profile.location.state }</span>
			</div>
		</StyledSidebarProfile>
	)
}