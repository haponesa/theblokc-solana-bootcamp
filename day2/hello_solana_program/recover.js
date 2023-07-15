// recover.js
const bs58 = require('bs58');
const fs = require('fs');
b = bs58.decode('2hWZxayD7cB3jDUVppEjhePbFe7C5MdXY7fMhu3jyYfGz9MsR9GgMXdGKET6Dp1tzh5wnhnw2HaW6Js4AwMeJnux');
j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
fs.writeFileSync('key.json', `[${j}]`);