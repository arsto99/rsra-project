const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

function generateCertificate() {
    // Generate a new key pair
    const keys = forge.pki.rsa.generateKeyPair(2048);

    // Create a new certificate
    const cert = forge.pki.createCertificate();

    // Set certificate fields
    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

    const attrs = [{
        name: 'commonName',
        value: 'localhost'
    }, {
        name: 'countryName',
        value: 'SA'
    }, {
        shortName: 'ST',
        value: 'Riyadh'
    }, {
        name: 'localityName',
        value: 'Riyadh'
    }, {
        name: 'organizationName',
        value: 'RSAR Development'
    }, {
        shortName: 'OU',
        value: 'Development'
    }];

    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    // Self-sign certificate
    cert.sign(keys.privateKey, forge.md.sha256.create());

    // Convert to PEM format
    const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
    const certificatePem = forge.pki.certificateToPem(cert);

    // Create certs directory if it doesn't exist
    const certsDir = path.join(__dirname, '../../../certs');
    if (!fs.existsSync(certsDir)) {
        fs.mkdirSync(certsDir, { recursive: true });
    }

    // Write files
    fs.writeFileSync(path.join(certsDir, 'key.pem'), privateKeyPem);
    fs.writeFileSync(path.join(certsDir, 'cert.pem'), certificatePem);

    console.log('Certificate and private key have been generated successfully!');
}

generateCertificate();
