//Native Packages

//3rd party
const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

//Our Packages
const utils = require('./utilz.js');

MongoClient.connect(utils.system_configuration['system']['databases']['mongo']['url'], { useUnifiedTopology: true, useNewUrlParser: true }, ConfigureAPI);

/* Internal Configuration */
let api = null;
let admin = null;
function ConfigureAPI(err, db) {
	if(!err) {
		api = db.db('api');
		//admin = db.db('admin').admin();
		
		utils.logData("Mongo Connected & API Configured...");
	} else if(err) { utils.logData('Mongo Not Connected'); console.log(err); return; }
}


async function AuthenticateUser(upObj) {
	let col = api.collection('users');
	let u = utils.decodeBase64(upObj['user']);
	let p = utils.decodeBase64(upObj['password']);

	let find =  {
    			$or: [
		            { email : u },
		            { alias:  u }
				]
   			}
   			
   	try {
	   	let user = await col.findOne(find);
	   	if(user !== null) {
			let vp = await utils.bcryptValidatePassword(p, user['password']);
		    switch(vp) {
			    case true:
			    	return user;
			    	break;
			    case false:
			    default:
			    	return false;
		    }
	   	}else { console.log('Error: @Mongo, User Not Found.'); return false; }
   	} catch(error) {
	   console.log('Error: @Mongo, Something Went Horribly Wrong.'); 
	   return false;	
   	}			
}

async function GetPaginatedDocuments(collection, project, match, sort, skip, limit) {
	let count = await api.collection(collection).find(match).count();
	let aggAry = [
		{ '$match': match },
		{ '$sort': sort },
		{ '$skip': parseInt(skip) },
		{ '$limit': parseInt(limit) },	
	];
	( project !== null ) ? aggAry.push(project) : '';
	
	let cursor = await api.collection(collection).aggregate(aggAry);
	
	let docs = [];
	while(await cursor.hasNext()) {
		const doc = await cursor.next();
		docs.push(doc);
	}
	
	//console.log("COUNT: ", count)
	docs = { count: parseInt(count), [`${collection}`]: docs }
	
	return docs
}

async function GetAuthors(authors) {
	console.log(authors);
	authors = authors.map(function(item) {
		return ObjectId(item);
	});
	
	let cursor = await api.collection('users').find({"_id": { "$in": authors }});
	let docs = [];
	while(await cursor.hasNext()) {
		const doc = await cursor.next();
		delete doc.password;
		docs.push(doc);
	}
	//console.log(docs);
	
	return docs;
}

async function InsertDocument(collection, payload) {
	let result = await api.collection(collection).insertOne(payload);
	return result;
}

async function UpdateDocument(type, oid, d) {
	switch(type) {
		case 'like-article':
			let result = await api.collection('articles').updateOne({'_id': ObjectId(oid)}, d);
			return result;
			break;
		default:
			break;
	}
}



module.exports = {
	AuthenticateUser,
	GetPaginatedDocuments,
	GetAuthors,
	InsertDocument,
	UpdateDocument,
}

