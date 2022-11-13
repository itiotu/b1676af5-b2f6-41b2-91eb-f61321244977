const {getKeysFromFile} = require("./util");
const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';

module.exports = async function (req, res, next) {
	const isKeyValid = await isApiKeyValid(req.headers['x-api-key']);
	if (!isKeyValid) {
		return res.status(401).json();
	}

	next();
};

async function isApiKeyValid(apiKey) {
	const keys = await getKeysFromFile(VALID_KEYS_PATH);

	return apiKey && keys.includes(apiKey);
}
