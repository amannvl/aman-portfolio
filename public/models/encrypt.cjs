const crypto = require("crypto");
const fs = require("fs");

const encryptFile = (inputFile, outputFile, password) => {
  const key = crypto.createHash("sha256").update(password).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const input = fs.createReadStream(inputFile);
  const output = fs.createWriteStream(outputFile);

  output.write(iv);
  input.pipe(cipher).pipe(output);
};

const encryptIfPresent = (inputFile, outputFile, password) => {
  if (!fs.existsSync(inputFile)) {
    console.log(`Skipping ${inputFile} because it does not exist.`);
    return;
  }

  encryptFile(inputFile, outputFile, password);
  console.log(`Encrypted ${inputFile} -> ${outputFile}`);
};

// Keep this password aligned with src/components/Character/utils/character.ts
encryptIfPresent("character.glb", "character.enc", "MyCharacter12");
