import { createNumberCipher } from "./number";

const cipher = createNumberCipher({
    characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    wordLength: 5,
});

const testNumber = 523827512

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "PZqz0"
const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 523827512

console.log({ encodedAsString, decodedAsNumber, ssL: encodedAsString.length });
