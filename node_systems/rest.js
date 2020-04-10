//Native Node
var fs = require('fs');
var https = require('https');

//3rd party
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

//Our Packages
const utils = require('./utilz.js'); 
const mongo = require('./mongo.js');


const app = express(); 
	  app.use(cors());

/*  Rest Response Codes
	- 701, Authentication Success 	
	- 702, Verified JWT
	- 703, Valid Articles Request
	- 704, Successful Authors Request
	
	- 601, Failed Auth
	- 602, JWT Verification failed
*/


https.createServer({
  key: utils.k3yc3r7.key,
  cert: utils.k3yc3r7.cert
},
app).listen(1300, ()=> {
	utils.logData('Express Server Listening...');

	
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	    next();
	});	
	
	app.get('/', (req,res) => {
		res.send('pr0con.com public access API');
	});
	
	app.post('/login', async (req,res) => {
		let user = await mongo.AuthenticateUser(req.body.payload);
		if(user !== false && user !== null) {
			user['password'] = 'F00';
			let token = await utils.GenerateJwt(user);
			res.status(200).send({ access_token: token, user, Code: 701 });
		} else {
			res.status(401).send({ Error: ['Failed Authentication'], Code: 601 })
		}
	});
	
	app.post('/register', async (req,res) => {
		/* To Implement */
	});
	
	app.get('/verify', async(req,res) => {
		//console.log(req.headers);
		let auth = req.header('authorization').split("Bearer ");
		let verified = await utils.VerfifyJwt(auth[1]);
		switch(verified) {
			case true:
				console.log('Valid JWT');
				res.status(200).send({ success_message: ['Valid Jwt'], Code: 702 })
				break;
			case false:
				console.log('Crappy JWT');
				res.status(401).send({ failed_message: ['Jwt Invalid'], Code: 602 })
				break;
			default:
				break;
		}
	});
	
	app.post('/articles', async (req,res) => { // {} = empty match
		let articles = await mongo.GetPaginatedDocuments(req.body.payload.col, null, {}, req.body.payload.sort, req.body.payload.skip, req.body.payload.limit );
		res.status(200).send({ articles, Code: 703 });
	});
	
	app.post('/authors', async (req,res) => {	
		let authors = await mongo.GetAuthors(req.body.payload.newAuthors);
		res.status(200).send({ authors, Code: 704 });
	});
	
	app.post('/tags/:tag', async (req,res) => {	
		/* To Implement */
	});	
	
	app.get('/articles/:oid/like/:uid', async(req,res) => {
		let result = await mongo.UpdateDocument('like-article', req.params.oid, {"$addToSet": { 'likes': { uid: req.params.uid, 'ts': Date.now() }}});
		if(result['modifiedCount'] === 1) { res.status(200).send({  Code: 706 }); }
	});
	
	app.get('/articles/:oid/unlike/:uid', async(req,res) => {
		/* IMPLEMENT */	
		res.status(200).send({  Code: 707 });	
	});
	
	app.post('/articles/post/new', async (req,res) => {
		let result = await mongo.InsertDocument('articles', req.body.payload);
		console.log(result)
		res.status(200).send({  Code: 708 });
	});	

	
	
});		



