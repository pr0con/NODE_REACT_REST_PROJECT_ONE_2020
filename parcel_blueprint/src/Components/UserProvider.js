import React, { createContext, useState, useReducer } from 'react';

export const UserContext = createContext([ {}, () => {} ]);

const initialState = {
	isLoading: true,
	isLoggedIn: false,
	user: null
}

const reducer = (state, action) => {
	switch(action.type) {
		case "LOADING":
			return { ...state, isLoading: true }
		case "SET_AUTHORIZED":
			return { isLoggedIn: true, isLoading: false, user: action.payload }
		case "SET_UNAUTHORIZED":
			return { isLoading: false, isLoggedIn: false, user: null }
	}
}

export const UserProvider = ({children}) => {
	const value = useReducer(reducer, initialState);
	
	return(
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	)
}