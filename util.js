const fs = require('fs');
const LINE_ENDING = require('os').EOL;

function readFile(file) {
	return new Promise((res, rej) => {
		fs.readFile(file, {encoding: 'utf8'}, (error, data) => {
			if (error) {
				rej(error)
			}
			res(data);
		})
	})
}

async function getKeysFromFile(file) {
	const fileData = await readFile(file);
	return fileData.split(LINE_ENDING).filter(e =>  e);
}

function persistKey(key, file) {
	fs.appendFileSync(file, key + LINE_ENDING);

}
module.exports = {
	getKeysFromFile,
	persistKey
};
