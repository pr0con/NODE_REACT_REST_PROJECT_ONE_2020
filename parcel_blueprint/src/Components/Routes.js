import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Tag } from './Routes/Tag.js';
import { Feed } from './Routes/Feed.js';
import { Authentication } from './Routes/Authentication.js';
import { Profile } from './Routes/Profile.js';
import { Article } from './Routes/Article.js';
import { EditArticle } from './Routes/EditArticle.js';


export default () => {
	return(
		<Switch>
			<Route path="/" component={Feed} exact/>
			<Route path="/login" component={Authentication} />
			<Route path="/register" component={Authentication} />	
			
			<Route path="/tag/:tag" component={Tag} />			
			<Route path="/profiles/:profile" component={Profile} />	
			<Route path="/articles/:article/edit" component={EditArticle} exact/>	
			<Route path="/articles/:article" component={Article} />	
		</Switch>
	)
}