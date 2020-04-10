import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

import { AppContext } from './AppProvider.js';

const StyledNav = styled.div`
	position: relative;
	width: 100vw;
	height: 5rem;
	background: #151523;	
	
	display: grid;
	grid-template-columns: 32rem 1fr;

	
	& a {
		color: #56baca;
		text-decoration: none;
		margin-right: 1rem;
		font-size: 2rem;
	}	
	
	#nav-left,
	#nav-right {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	#nav-left {
		position: relative;
		
		#nav-left-logo {
			position: relative;
			margin-left: 1rem;
			width: 4rem;
			height: 4rem;
			background: url('/images/logo.png');
			background-position: center center;
			background-size: 4rem 4rem;
		}
		#nav-left-text {
			color: #56baca;
			font-size: 4rem;
			margin-left: 1rem;
			text-transform: uppercase;	
		}
	}
	#nav-right {
		width: 100%;
	}
`;

export function Nav() {
	const { user, setJwt } = useContext(AppContext)
	
	const handleLogout = () => {
		setJwt('^vAr^');
	}
	
	return(
		<StyledNav>
			<div id="nav-left">
				<div id="nav-left-logo"></div>
				<div id="nav-left-text">
					Pr0con
				</div>				
			</div>
			<div id="nav-right">
				<Link to="/">
					Pr0con
				</Link>
				<div className="flex-row-filler"></div>
				<NavLink to="/" exact>
					Home
				</NavLink>
				{	user.isLoggedIn === true &&			
					<NavLink to="/" onClick={ handleLogout }>
						Logout
					</NavLink>
				}
				{	user.isLoggedIn === false &&	
					<>
						<NavLink to="/login">
							Login
						</NavLink>
						<NavLink to="/register">
							Register
						</NavLink>
					</>	
				}							
			</div>
		</StyledNav>
	)
}