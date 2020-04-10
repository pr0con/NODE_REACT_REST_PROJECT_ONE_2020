const os = require('os');
const fs = require('fs');

const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v1: uuidv1 } = require('uuid');


const k3yc3r7  = {
	key: fs.readFileSync('/etc/letsencrypt/live/trash.pr0con.io/privkey.pem'), 
	cert: fs.readFileSync('/etc/letsencrypt/live/trash.pr0con.io/cert.pem'),
	key_path: '/etc/letsencrypt/live/trash.pr0con.io/privkey.pem',
	cert_path: '/etc/letsencrypt/live/trash.pr0con.io/cert.pem', 
};

var jwtPublicKey = fs.readFileSync('/var/www/keycertz/mykey.pub');
var jwtPrivateKey = fs.readFileSync('/var/www/keycertz/mykey.pem');

/*
        "iss":    "yourdomain.com",   // who creates the token and signs it
        "aud":    "yourdomain.com",   // to whom the token is intended to be sent
        "exp":    in10m,             	// time when the token will expire (10 minutes from now)
        "jti":    "Unique",             // a unique identifier for the token
        "iat":    time.Now().Unix(),    // when the token was issued/created (now)
        "nbf":    2,                    // time before which the token is not yet valid (2 minutes ago)
        "sub":    "subject",            // the subject/principal is whom the token is about
        
        "alias": alias,
        "email": email,
        "scopes": "api:read",    
*/	


const system_configuration = {
	"system": {
		"databases": {
			"mongo": {
				"url": "mongodb://mongod:SOMEHARDPASSWORD@127.0.0.1:27017?authMechanism=SCRAM-SHA-1&authSource=admin"	
			},
		},
		"security": {
			"jwt_secret": "SOMEHARDPASSWORD",
			"jwt_claims": {
		        issuer:    		"trash.pr0con.io",     	// who creates the token and signs it
		        audience:    	"trash.pr0con.io",  	// to whom the token is intended to be sent
		        expiresIn:   	"30m",             		// time when the token will expire (10 minutes from now)
		        jwtid:    		"",          			// a unique identifier for the token
		        //"iat":    	"", 					// when the token was issued/created (now) , USING DEFAULTS
		        notBefore:    	"0",                 	// time before which the token is not yet valid (0 milisecond agao, for emmediate validation)
		        subject:     	"Development Services", // the subject/principal is whom the token is about		       
				algorithm:  	"RS256"
		        //"user": null,							//filled in with custom
		        //"scopes": "api:full_access",					
			},
			"verify_options": {
				issuer:  	"trash.pr0con.io",
				subject:  	"Development Services",
				audience:  	"trash.pr0con.io",
				expiresIn:  "30m",
				algorithm:  ["RS256"]				
			}
		}
	}
}

function logData(message) {
	var d = new Date();
	var time =  '[' + d.getHours() + ':' + d.getMinutes() + ':' +d.getSeconds() + '] ';
	
	console.log(time + message)
}

function decodeBase64(data) {
	let buff = Buffer.from(data, 'base64');
	let text = buff.toString('ascii');
	return text	
}

async function bcryptValidatePassword(p,h) {
	return await bcrypt.compare(p,h);
}

async function GenerateJwt(user) {
	let claims = system_configuration['system']['security']['jwt_claims'];
	claims['jwtid'] = uuidv1();
	
	//based on user we get scopes
	//BASED ON ROLE ADD SCOPES
	let scopes = {
		api: 'full_access'
	}
	
	var token =  jwt.sign({user,scopes}, { key: jwtPrivateKey, passphrase: 'SOMEHARDPASSWORD' }, claims);
	
	return token;	
}

async function VerfifyJwt(token) {
	try {
		var legit = jwt.verify(token, jwtPublicKey, system_configuration['system']['security']['verify_options']);
		console.log("\nJWT verification result: " + JSON.stringify(legit));	
		return true; 
	} catch(err) {
		console.log(err)
		return false;
	}
	return false;	
}

module.exports = {
	k3yc3r7,
	system_configuration,
	
	logData,
	decodeBase64,
	bcryptValidatePassword,
	GenerateJwt,
	VerfifyJwt,
}


