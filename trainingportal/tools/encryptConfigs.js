const path = require('path');
const crypto = require('crypto');
const aescrypto = require(path.join(__dirname, '../aescrypto'));
const util = require(path.join(__dirname, '../util'));

const uid = require('uid-safe');
//temporarily write your passwords here, cleanup after generating the encrypted settings
var dbPass="<db pass>";//DELETE ME WHEN DONE
var slackSecret="<slack secret>";//DELETE ME WHEN DONE
var googleSecret="<google secret>";//DELETE ME WHEN DONE
var badgrToken = "<badgr token>";

const config = require(path.join(__dirname, '../config'));
const fs = require('fs');

console.log("======= config.js ==========");

//You can use the following script from  when you update your key to a new value
console.log('config.encDbPass="'+aescrypto.encrypt(dbPass)+'";');
console.log('config.encSlackClientSecret="'+aescrypto.encrypt(slackSecret)+'";');
console.log('config.encGoogleClientSecret="'+aescrypto.encrypt(googleSecret)+'";');
console.log('config.encBadgrToken="'+aescrypto.encrypt(badgrToken)+'";');


if(!util.isNullOrUndefined(config.samlProviderPvkFilePath)){
    var samlProviderPvk = fs.readFileSync(path.join(__dirname, config.samlProviderPvkFilePath), 'utf-8');
    var encSamlProviderPvk = aescrypto.encrypt(samlProviderPvk);
    console.log(encSamlProviderPvk);
} 


/**
 * Use this function to generate the properties for a local user
 */
function genLocalUser(username, givenName, familyName, password){
    
    var saltString = crypto.randomBytes(16).toString('base64').toString();
    var passwordHash = util.hashPassword(password,saltString);
    
    var user = {"givenName":givenName,"familyName":familyName,"passHash":passwordHash,"passSalt":saltString};
    console.log(username+":"+JSON.stringify(user));
}

//genLocalUser("organizer","Organizer","","<enter your password here>");//DELETE ME WHEN DONE

