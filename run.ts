import { createBigintCipher } from "./bigint";
import { createNumberCipher } from "./number";

const cipher = createBigintCipher();

const testNumber = 8234346565437n

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "ݽ䑇谇" 

const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 8234346565437n

console.log({ decodedAsNumber, encodedAsString })