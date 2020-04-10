import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const AppContext = createContext();

import { UserContext } from './UserProvider.js';
import useLocalStorage from './Hooks/useLocalStorage.js';
import { useFetch } from './Hooks/useFetch.js';

export default function(props) {		
	
	const [ user, dispatch ] = useContext(UserContext);
	
	const [ jwt, setJwt ] = useLocalStorage('access_token','^vAr^');
	const [ verifiedJwt, setVerifiedJwt ] = useState(null);
	
	const [{ fetching, response, error }, doFetch ]  = useFetch();	
	let history = useHistory();
	
	const [ display, setDisplay ] = useState({	
		state: false 
	});
	
	const setState = (what,k,v) => {
		let tmpObj = null;
		switch(what) {
			case "display":
				tmpObj = display;
				tmpObj[k] = v;
				setDisplay({ ...tmpObj });
				break;
			default:
				break;
		}	
	}
	const toggleState = (what, k) => {
		let tmpObj = null;
		switch(what) {
			case "display":
				tmpObj = display;
				tmpObj[k] = !tmpObj[k];
				setDisplay({ ...tmpObj });
				break;
			default:
				break;
		}	
	}
	
	/* Site Specific Data */
	const [ authors, setAuthors ] = useState({});
	
	
	
	useEffect(() => {
		if(jwt !== "^vAr^" && verifiedJwt === null) {
			(async function anon() {
		    	let options = {
					method: 'get',
					headers: {
						authorization: `Bearer ${jwt}`
					}
				}		
				await doFetch('https://trash.pr0con.io:1300/verify', options);				
			})();	
		} else if(jwt == "^vAr^") {
			dispatch({ type: 'SET_UNAUTHORIZED'});
		}
	},[jwt])
	
	useEffect(() => {
		if(fetching === false && response !== null && ("Code" in response)) {
			switch(response['Code']) {
				case 702:
					let base64Jwt = jwt.split('.')[1];
					let decodedJwt = atob(base64Jwt);
					let parsedJwt = JSON.parse(decodedJwt);				
					
					if(user['user'] === null) {						
						dispatch({ type: 'SET_AUTHORIZED', payload: parsedJwt['user'] })
					}
					history.push(`/profiles/${parsedJwt['user'].alias}`);
					break;
					
				default:
					break;
			}
		}
		if(fetching === false && error !== null && typeof error.response !== 'undefined' && error.hasOwnProperty('response') && ("Code" in error.response.data)) {
			//console.log(error.response);
			switch(error.response.data['Code']) {
				case 602:
					setJwt('^vAr^');
					break;
				default:
					break;
			}
		}
	},[fetching, error, response]);
	
	const handleKeyEvent = (event) => {
		if(event.type == "keyup") {
			switch(event.key) {
				case "Escape":
					toggleState('display','state');
					break;
				default:
					break;	
			}
		}
		if(event.type == "keydown") {
			switch(event.key) {
				default:
					break;
			}			
		}
	}
	
	useEffect(() => {
		window.addEventListener("keyup",  handleKeyEvent);
		window.addEventListener("keydown",  handleKeyEvent);
		
		return () => { 
			window.removeEventListener("keyup",  handleKeyEvent);
			window.removeEventListener("keydown",  handleKeyEvent);
		}
	},[handleKeyEvent]); //handleKeyEvent	
	
	return(
		<AppContext.Provider value={{
			
			jwt,		
			user,
			setJwt,
			dispatch,			
			
			display, 
			setDisplay,
			
			authors, 
			setAuthors,
		}}>
			{ props.children }
		</AppContext.Provider>		
	)		
}