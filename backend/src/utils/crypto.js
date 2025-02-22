// cryptoUtils.js
const crypto = require('crypto');

// Configurações para criptografia
const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encryptId(id) {
  try {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(id.toString());
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  } catch (error) {
    throw new Error('Erro ao criptografar ID: ' + error.message);
  }
}

function decryptId(encryptedId) {
  try {
    const textParts = encryptedId.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedText = Buffer.from(textParts[1], 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return parseInt(decrypted.toString(), 10);
  } catch (error) {
    throw new Error('Erro ao descriptografar ID: ' + error.message);
  }
}

module.exports = {
  encryptId,
  decryptId
};