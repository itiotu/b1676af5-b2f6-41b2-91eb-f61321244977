const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const shortid = require('shortid');
const {getKeysFromFile, persistKey} = require("./util");

module.exports = async function (req, res) {
	const currentKeys = await getKeysFromFile(VALID_KEYS_PATH);

	const key = generateKey(currentKeys);

	persistKey(key, VALID_KEYS_PATH);

	return res.status(200).json({apiKey: key});
};

function generateKey(currentKeys) {
	const newKey = shortid.generate();

	if (currentKeys.includes(newKey)) {
		return generateKey(currentKeys);
	}

	return newKey;
}

