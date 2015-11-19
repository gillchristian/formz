'use strict';

/** Configuration **/
let config = {
	user : process.env.FTP_USER,  
	password : process.env.FTP_PWD,  
	host : process.env.host || 'your hostname or ip address',  
	port : process.env.port || 21,  
	localFilesGlob : process.env.local || ['./**/*'],
	remoteFolder : process.env.remote || '/myApp'
}

module.exports = config;