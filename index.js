const ftp = require("basic-ftp")
const core = require('@actions/core');
const github = require('@actions/github');
const secureOpt = {
	rejectUnauthorized: false 
};
const config = {
	host: core.getInput('host'),
	user: core.getInput('username'),
	password: core.getInput('password'),
	secure: true,
	strictSSL: false,
	secureOptions: secureOpt
};
const mainPath = core.getImput('mainPath');
const srcFolder = core.getInput('srcFolder');
const targetFolder = core.getInput('targetFolder')
async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {		
        await client.access(config);
		await client.cd(mainPath)
		// await client.pwd()
		await client.ensureDir(srcFolder)
		await client.clearWorkingDir()
		await client.uploadFromDir(targetFolder)
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}
deploy();