// import { experiments } from "webpack";
// import { createPermutationDecodeEncodeForInteger } from "./permutationController";
// import fs from "fs";

const factorial = (n: bigint): bigint => {
  let result = 1n;
  for (let i = 1n; i <= n; i++) {
    result *= i;
  }
  return result;
};

const permutationsBigint = (n: bigint, r: bigint) =>
  factorial(n) / factorial(n - r);
const permutationsNumber = (n: number, r: number) =>
  Number(permutationsBigint(BigInt(n), BigInt(r)));


const createBigintPermutations = (size: bigint, momentumSize: bigint) => {
  const permutations: bigint[] = [];
  for (let i = 0n; i < momentumSize; i++) {
    permutations.push(permutationsBigint(size - i - 1n, momentumSize - i - 1n))
  }
  return permutations
}
const createNumberPermutations = (size: number, momentumSize: number) => {
  // const permutations: bigint[] = [];
  // for (let i = 0n; i < momentumSize; i++) {
  //   permutations.push(permutationsBigint(size - i - 1n, momentumSize - i - 1n))
  // }
  return createBigintPermutations(BigInt(size), BigInt(momentumSize)).map(Number)
}



interface Option {
  characters?: string;
  wordLength?: number;
}
interface EnCodeDecode {
  encode: (decodeNumber: number) => string;
  decode: (encodeString: string) => number;
}

export const createNumberCipher = ({ characters, wordLength }: Option) => {
  if (typeof characters === "string" && typeof wordLength === "number") {
    return createCipherNumberToWord({ characters, wordLength });
  }
  if (typeof characters === "string") {
    return createCipherNumberToString({ characters });
  }
};

const createCipherNumberToWord = ({
  characters,
  wordLength,
}: Required<Option>): EnCodeDecode => {
  const charArray = characters.split("");
  const permutationCache = Array.from(Array(wordLength), (_, i) =>
    permutationsNumber(charArray.length - i - 1, wordLength - i - 1)
  );
  console.log({ permutationCacheNUM: permutationCache });
  return {
    encode: (decodeNumber) => {
      const characters = [...charArray];

      let permutation = "";

      for (let i = 0; i < wordLength; i++) {
        const remainingPermutations = permutationCache[i];

        const characterIndex = Math.floor(decodeNumber / remainingPermutations);

        permutation += characters[characterIndex];

        characters.splice(characterIndex, 1);

        decodeNumber %= remainingPermutations;
      }

      return permutation;
    },
    decode: (encodeString) => {
      const characters = [...charArray];
      let index = 0;

      for (let i = 0; i < wordLength; i++) {
        const characterIndex = characters.indexOf(encodeString[i]);
        const remainingPermutations = permutationCache[i];

        index += characterIndex * remainingPermutations;

        characters.splice(characterIndex, 1);
      }

      return index;
    },
  };
};
const createCipherNumberToString = ({
  characters,
}: Omit<Option, "wordLength">): EnCodeDecode => {
  return {
    encode: (decodeNumber) => {
      const base = characters.length;
      let encodedString = "";

      while (decodeNumber > 0) {
        const remainder = decodeNumber % base;
        encodedString = characters[remainder] + encodedString;
        decodeNumber = Math.floor(decodeNumber / base);
      }

      return encodedString;
    },
    decode: (encodeString) => {
      const base = characters.length;
      let decodedNumber = 0;

      for (let i = 0; i < encodeString.length; i++) {
        const index = characters.indexOf(encodeString[i]);
        decodedNumber += index * base ** (encodeString.length - i - 1);
      }

      return decodedNumber;
    },
  };
};

interface OptionBigint {
  characters: string;
  wordLength?: bigint;
}
interface EnCodeDecodeBigint {
  encode: (decodeNumber: bigint) => string;
  decode: (encodeString: string) => bigint;
}
export const createBigintCipher = ({
  characters,
  wordLength,
}: OptionBigint) => {
  if (typeof wordLength === "bigint") {
    return createCipherBigintToWord({ characters, wordLength });
  }
  return createCipherBigintToString({ characters });
};

const createCipherBigintToWord = ({
  characters,
  wordLength,
}: Required<OptionBigint>): EnCodeDecodeBigint => {
  const charArray = characters.split("");

  const permutationCache = Array.from(Array(Number(wordLength)), (_, i) => {
    // console.log(
    //   // charArray.length - i - 1,
    //   Number(wordLength) - i - 1,
    //   [Number(wordLength), i - 1],
    //   // BigInt(charArray.length - i - 1),
    //   [BigInt(wordLength), BigInt(i - 1)],
    //   BigInt(wordLength) - BigInt(i - 1)
    // );
    // permutationsNumber(charArray.length - i - 1, wordLength - i - 1)
    return permutationsBigint(
      BigInt(charArray.length - i - 1),
      BigInt(wordLength) - BigInt(i) - 1n
    );
  });
  // console.log({ permutationCachebi333gL: permutationCache });
  return {
    encode: (decodeNumber) => {
      const characters = [...charArray];

      let permutation = "";

      for (let i = 0; i < wordLength; i++) {
        const remainingPermutations = permutationCache[i];
        const characterIndex = Number(
          decodeNumber / remainingPermutations / 1n
        );

        permutation += characters[characterIndex];

        characters.splice(characterIndex, 1);

        decodeNumber %= remainingPermutations;
      }

      return permutation;
    },
    decode: (encodeString) => {
      const characters = [...charArray];
      let index = BigInt(0);

      for (let i = 0; i < wordLength; i++) {
        const characterIndex = characters.indexOf(encodeString[i]);
        const remainingPermutations = permutationCache[i];

        index += BigInt(characterIndex) * remainingPermutations;

        characters.splice(characterIndex, 1);
      }

      return index;
      // const base = characters.length;
      // let decodedNumber = BigInt(0);

      // for (let i = 0; i < encodeString.length; i++) {
      //     const index = characters.indexOf(encodeString[i]);
      //     decodedNumber += BigInt(index * base ** (encodeString.length - i - 1));
      // }

      // return decodedNumber;
    },
  };
};

const createCipherBigintToString = ({
  characters,
}: Omit<OptionBigint, "wordLength">): EnCodeDecodeBigint => {
  return {
    encode: (decodeNumber) => {
      const base = BigInt(characters.length);
      let encodedString = "";

      while (decodeNumber > 0) {
        const remainder = decodeNumber % base;
        encodedString = characters[Number(remainder)] + encodedString;
        decodeNumber = decodeNumber / base / BigInt(1);
      }

      return encodedString;
    },
    decode: (encodeString) => {
      const base = BigInt(characters.length);
      let decodedNumber = BigInt(0);
      const encodeStringLength = encodeString.length;

      for (let i = 0; i < encodeString.length; i++) {
        const index = BigInt(characters.indexOf(encodeString[i]));
        decodedNumber += index * base ** BigInt(encodeStringLength - i - 1);
      }

      return decodedNumber;
    },
  };
};

const createChar = (length: number) =>
  Array.from(new Array(length), (_, index) => String.fromCharCode(index)).join(
    ""
  );
// .fill(1)
// .map((_, i) => String.fromCharCode(65 + i))
// .join("");
const characters = createChar(1000);
const wordLength = 5n;

const sss = createBigintCipher({
  characters: characters,
  wordLength: wordLength,
});
const sssasd = createNumberCipher({
  characters: characters,
  wordLength: 5,
});
const numberss = 1730641791n;

// const str123123 = sss.encode(numberss);
// const strn = sssasd.encode(1730641791);
// const num = sss.decode(str123123);
// console.log({ characters, str123123, strLn: str123123.length, num, numberss });

const createCipherForMaxChars = (
  wordLength: bigint
  //   {
  //   characters,
  //   wordLength,
  // }: Required<OptionBigint>
): EnCodeDecodeBigint => {
  // const charArray = characters.split("");
  const charLengthInJS = 65535n;

  // const permutationCache: bigint[] = [];

  // for (let i = 0n; i < wordLength; i++) {
  //   permutationCache.push(
  //     permutationsBigint(charLengthInJS - i - 1n, wordLength - i - 1n)
  //   );
  // }
  const permutationCache = Array.from(Array(Number(wordLength)), (_, i) => {
    return permutationsBigint(
      charLengthInJS - BigInt(i) - 1n,
      BigInt(wordLength) - BigInt(i) - 1n
    );
  });
  // console.log({ permutationCachebigL: permutationCache });
  return {
    encode: (decodeNumber) => {
      // const characters = [...charArray];

      let permutation = "";

      for (let i = 0; i < wordLength; i++) {
        const remainingPermutations = permutationCache[i];
        const characterIndex = Number(
          decodeNumber / remainingPermutations / 1n
        );

        permutation += String.fromCharCode(characterIndex);
        // characters[characterIndex];

        // characters.splice(characterIndex, 1);

        decodeNumber %= remainingPermutations;
      }

      return permutation;
    },
    decode: (encodeString) => {
      // const characters = [...charArray];
      let index = 0n;

      for (let i = 0; i < wordLength; i++) {
        const characterIndex = encodeString.charCodeAt(i);
        //  characters.indexOf(encodeString[i]);
        const remainingPermutations = permutationCache[i];

        index += BigInt(characterIndex) * remainingPermutations;

        // characters.splice(characterIndex, 1);
      }

      return index;
      // const base = characters.length;
      // let decodedNumber = BigInt(0);

      // for (let i = 0; i < encodeString.length; i++) {
      //     const index = characters.indexOf(encodeString[i]);
      //     decodedNumber += BigInt(index * base ** (encodeString.length - i - 1));
      // }

      // return decodedNumber;
    },
  };
};
// 1730641791
// return
const sliceArray = <
  A extends { length: number; slice: (a: number, b: number) => A }
>(
  arr: A,
  chunkSize: number
): A[] => {
  const slices: A[] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    slices.push(arr.slice(i, i + chunkSize));
  }
  return slices;
};
// const fileData = fs.readFileSync("./package.json");

// Convert binary data to bytes (Buffer)

/*
1. დავყოთ ნაწილებად დავაჯოინოთ 0 ით და შემდეგ აღვადგინოთ

*/
const getContainIndexes = (str: string, countianChar: String) => {
  let indexes: number[] = []
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === countianChar) {
      indexes.push(i)
    }
  }
  return indexes
}

function bytesToInteger(arr: bigint[], maxNum = 255n) {
  let result = 0n;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i] * ((maxNum + 1n) ** BigInt(i));
  }
  return result;
}

function integerToBytes(num: bigint, length: number, maxNum = 255n) {
  const result: bigint[] = [];
  for (let i = 0; i < length; i++) {
    result.push(num % (maxNum + 1n));
    num = num / (maxNum + 1n);
  }
  return result;
}




// const chars = {

// }
// String.fromCharCode(189)
// 65535

const getOneByteChars = () => {
  const charList = new Set()
  for (let i = 0; i <= 255; i++) {
    // const char = Buffer 
    // String.fromCharCode(i);
    // const buff = [...
    const str = Buffer.from([i]).toString()
    if (str.length === 1) {
      charList.add(str)
    }

  }
  // console.log({ charList })
  // for (let i = 0; i <= 65535; i++) {
  //   const char = String.fromCharCode(i);
  //   const buff = [...Buffer.from(char, "utf8").values()];
  //   if (buff.length < 2) {
  //     charList.push(char)
  //   }

  // }
  return [...charList]
}
// const list = [];
// for (let i = 0; i <= 65535; i++) {
//   const char = String.fromCharCode(i);
//   const buff = [...Buffer.from(char, "utf8").values()];
//   if (buff.length === 1) {
//     list.push(char)
//   }

// }

const characterssadsad = Array.from(Array(50), (_, i) => String.fromCharCode(i));
const ssasaaa = createNumberCipher({
  characters: characterssadsad.join(""),
  wordLength: 5
})
// console.log({ list: getOneByteChars().join("") })
//////////////////////////////////////////////////////////////////////
const ressssssss = bytesToInteger([5n, 7n, 5n], 15n)
// console.log("bytesToInteger(", ressssssss)
// console.log("integerToBytes(", integerToBytes(ressssssss, 3, 15n))

const bytes = bytesToInteger(Array(5).fill(255n))
const safeCharacters = getOneByteChars().join("")
// const sssss = createCipherBigintToWord({
//   characters: safeCharacters,
//   wordLength: 6n
// });

// const ssaa = sssss.encode(bytes)

// const numaa = sssss.decode(ssaa)

// console.log(`s.ს`, {
//   bytes,
//   ssaa,
//   numaa,
//   vl: [...Buffer.from(ssaa, "utf8").values()]
// });

const getBestEncodeWordSize = (num: bigint) => {
  for (let i = 15; i > 0; i--) {
    if (num > permutationsBigint(
      BigInt(safeCharacters.length - 1),
      BigInt(i) - 1n
    )) {
      return BigInt(i + 1)
    }
  }
  return 0n
}
// function findMaxBigInt(arr: bigint[]) {
//   let maxBigInt = 0n

//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > maxBigInt) {
//       maxBigInt = arr[i];
//     }
//   }

//   return maxBigInt;
// }
// const circlePress = (buff: Buffer, circularSize: number, lastPiceSizes: number[] = []) => {

//   // const buff = Buffer.from(str, "utf8");
//   const bytes = [...buff.values()];
//   const bigintIntegers = sliceArray(bytes.map(BigInt), 16).map(chunk => {
//     const maxNum = findMaxBigInt(chunk)
//     return {
//       slice: bytesToInteger(chunk, maxNum),
//       maxNum
//     }
//   });
//   // console.log({ bigintIntegers });
//   const comprisedStr = bigintIntegers.map(item => {
//     const bestEncodeWordSize = getBestEncodeWordSize(item.slice);
//     const encoder = createCipherBigintToWord({
//       characters: safeCharacters,
//       wordLength: bestEncodeWordSize
//     });
//     console.log({
//       ...item,
//       bestEncodeWordSize,
//       encode: encoder.encode(item.slice),
//       decode: encoder.decode(encoder.encode(item.slice))
//     })

//     return {
//       encoded: encoder.encode(item.slice),
//       encodedBuffer: Buffer.from(encoder.encode(item.slice)),
//       maxNum: item.maxNum
//     }
//   })

//   // console.log({ bigintIntegers, from: bytes, to: [...Buffer.from(comprisedStr, "utf8")] })
//   console.log(` comprisedStr[comprisedStr.length - 1].encodedBuffer`, [...comprisedStr[comprisedStr.length - 1].encodedBuffer.values()])
//   // if (circularSize === 0) {
//   return {
//     buffer: Buffer.from([
//       ...comprisedStr.flatMap(el => [...el.encodedBuffer.values()]),
//       // ...comprisedStr.map(el => Number(el.maxNum)),
//       // comprisedStr[comprisedStr.length - 1].encodedBuffer.length ?? 0
//     ]),
//     // lastBufferSize: ,
//     maxSizes: comprisedStr.reduce((a, b) => (a + (b.encodedBuffer.length)), 0)
//   }
// }

// const decompress = (compressValue: ReturnType<typeof circlePress>) => {
//   // const buff = Buffer.from(compressValue.buffer, "utf8")
//   const { buffer } = compressValue
//   const lastBuffSize = buffer[buffer.length - 1]
//   let buffStartSize = compressValue.maxSizes
//   let buffers: Buffer[] = [buffer.subarray(compressValue.maxSizes - lastBuffSize, compressValue.maxSizes)]
//   console.log([...buffer.values()])
//   // for (let i = 0; i < 5; i++) {

// }

// console.log(contentStartPosition)

// }
// const sssssasdas = sliceArray([...fileData.values()].map(BigInt), 25).map(bytesToInteger)

// const ress = sssssasdas.map(sssss.encode)

// const sqringsss = `fs.readFileSync("./package.json", "utf8")`

// const resssaaa = circlePress(Buffer.from(sqringsss, "utf8"), 1)

// console.log(
//   "ress_ress_ress",
//   resssaaa.buffer.toString(),
//   sqringsss.length,
//   resssaaa.buffer.toString().length,
//   safeCharacters.length,
//   decompress(resssaaa)
// )

// const integer = bytesToInteger(bytes)
// const bytesDec = integerToBytes(integer, bytes.length)
// console.log({ bytes, integer, bytesDec })
// 114,0 101,0 114,
// 114,0 1,0 1,0 114,
// const bytes = Buffer.from(fileData);



// console.log(
//   "sdasdas",
//   [...fileData.values()],
//   sliceArray([...fileData.values()], 25),
//   fileData.toString().length,
//   sliceArray([...fileData.values()], 25)
//     .map((el) => el.map(String).join("0"))
//     .map(BigInt)
//     .map(sssss.encode).join("").length,
//   [...Buffer.from(sliceArray([...fileData.values()], 25)
//     .map((el) => el.map(String).join("0"))
//     .map(BigInt)
//     .map(sssss.encode).join(""), "utf8").values()]
//   // .map((el) => [...Buffer.from(el, "utf8").values()])
// );
// 11501000970115010003209701150100011301190114010101140117
// const numd =
//   26911033442631772380330449962683165473160518509638401801015363328000n;

// const encodeasa = sssss.encode(numd);

// const decodeeess = sssss.decode(encodeasa);

// console.log({
//   numd,
//   encodeasa,
//   encodeasaLn: encodeasa.length,
//   numdLN: numd.toString().length,
//   decodeeess,
// });
// function encodeTwoNumbers(num1: number, num2: number) {
//   const maxNum2 = 15; // Assuming a maximum value of 15 for num2
//   const shiftAmount = Math.ceil(Math.log2(maxNum2 + 1)); // Calculate shift amount
//   return (num1 << shiftAmount) | num2;
// }

// function decodeTwoNumbers(encodedNumber: number) {
//   const maxNum2 = 15; // Same maximum value as used in encoding
//   const shiftAmount = Math.ceil(Math.log2(maxNum2 + 1));
//   const mask = (1 << shiftAmount) - 1; // Create mask for extracting num2
//   const num1 = encodedNumber >> shiftAmount;
//   const num2 = encodedNumber & mask;
//   return [num1, num2];
// }

// // Example usage:
// const convetable = `me var soso gaige`.split("").map((el) => el.charCodeAt(0));
// const destinationUm = convetable.reduce((a, b) => {
// console.log({ a, b });
// return encodeTwoNumbers(a, b);
// }, 0);

// const stringFullLength = convetable.length;
// const encoded = encodeTwoNumbers(2796202, 10);
// const decoded = decodeTwoNumbers(encoded);
// console.log({ encoded, decoded }); // Output: 542 (42 shifted left by 4, combined with 10)
// console.log({ convetable, destinationUm }); // Output: [42, 10]
//////////////////////////
// const strsasd = sss.encode(BigInt(destinationUm));
// const ressasdsadas = Number(sss.decode(strsasd));
// console.log(strsasd,  ressasdsadas);

// const numerrs: number[] = [];
// for (let index = stringFullLength; index != 0; index--) {
// numerrs.push(...)
// console.log(decodeTwoNumbers(destinationUm));
// }
// const ss = Array.from(Array(stringFullLength), (_,) => _).reverse()
// decodeTwoNumbers
////////////////////////////////////////////////////////////////////////////////////////////
// // function convertStringToDiapasonNumber(string: string, min: number, max: number) {
// //     const parsedNumber = parseFloat(string); // Attempt to parse the string as a number

// //     if (isNaN(parsedNumber)) {
// //         throw new Error("Invalid input: String cannot be parsed as a number"); // Handle invalid input
// //     }

// //     const clampedNumber = Math.min(Math.max(parsedNumber, min), max); // Clamp the number within the range
// //     return clampedNumber;
// // }

// // // Example usage:
// // try {
// //     const convertedNumber = convertStringToDiapasonNumber("sdasd", 10, 50);
// //     console.log(convertedNumber); // Output: 42.5 (clamped to the range 10-50)
// // } catch (error) {
// //     console.error(error); // Handle errors gracefully
// // }
// function encodeDecodeStringDiapason(string: string, startNumber: number, endNumber: number) {
//     // Validate input
//     if (!string || typeof string !== 'string') {
//         throw new Error('Input must be a valid string.');
//     }
//     if (startNumber > endNumber) {
//         throw new Error('Start number must be less than or equal to end number.');
//     }

//     // Create a mapping from characters to numbers
//     const charMap: Record<string, number> = {};
//     for (let i = 0; i < string.length; i++) {
//         charMap[string[i]] = startNumber + i % (endNumber - startNumber + 1); // Ensure numbers stay within range
//     }

//     // Encode the string into a numbers array
//     const encodedNumbers = string.split('').map(char => charMap[char]);

//     // Decode the string (reverse the encoding process)
//     function decode(numbersArray: number[]) {
//         let decodedString = '';
//         for (const num of numbersArray) {
//             const charIndex = num - startNumber;
//             const char = string[charIndex];
//             decodedString += char;
//         }
//         return decodedString;
//     }

//     return { encodedNumbers, decode };
// }

// const dddd = "hello world";
// // Example usage:
// const result = encodeDecodeStringDiapason("hello world", 40, 410);
// console.log(result.encodedNumbers); // Output: [40, 41, 42, 43, 44, 55, 46, 47, 48, 49, 50]
// console.log(result.encodedNumbers.length, dddd.length, result.decode(result.encodedNumbers)); // Output: "hello world"

// ///////////////////
// function encodeString(str: string, start: number, end: number) {
//     const charMap: Record<string, number> = {};
//     let code = start;
//     const compressed = [];

//     for (let i = 0; i < str.length; i++) {
//         const char = str[i];
//         if (!charMap[char]) {
//             charMap[char] = code++;
//             if (code > end) {
//                 throw new Error("Number range exceeded");
//             }
//         }
//         compressed.push(charMap[char]);
//     }

//     return [compressed, charMap] as const;
// }

// function decodeString(compressed: number[], start: number, end: number, charMap: Record<string, number> = {}) {
//     const decoded = [];

//     for (let code of compressed) {
//         if (code >= start && code <= end) {
//             const char = Object.keys(charMap).find((c) => charMap[c] === code);
//             if (char) {
//                 decoded.push(char);
//             } else {
//                 throw new Error("Invalid code in compressed array");
//             }
//         } else {
//             throw new Error("Code out of range");
//         }
//     }

//     return decoded.join("");
// }

// // // Encoding
// // const [compressed, charMap] = encodeString("hello world", 10, 3000);
// // console.log(compressed); // Output: [10, 11, 13, 13, 15, 30, 25, 23, 15, 18, 12, 4]

// // // Decoding
// const decoded = decodeString(compressed, 10, 30000, charMap);
// console.log(decoded); // Output: "hello world"
// function encodeTwoNumbers(num1: number, num2: number) {
//     const maxNum2 = 15; // Assuming a maximum value of 15 for num2
//     const shiftAmount = Math.ceil(Math.log2(maxNum2 + 1)); // Calculate shift amount
//     return (num1 << shiftAmount) | num2;
// }

// function decodeTwoNumbers(encodedNumber: number) {
//     const maxNum2 = 15; // Same maximum value as used in encoding
//     const shiftAmount = Math.ceil(Math.log2(maxNum2 + 1));
//     const mask = (1 << shiftAmount) - 1; // Create mask for extracting num2
//     const num1 = encodedNumber >> shiftAmount;
//     const num2 = encodedNumber & mask;
//     return [num1, num2];
// }

// // // Example usage:
// const encoded = encodeTwoNumbers(2796202, 10);
// const decoded = decodeTwoNumbers(encoded);
// console.log(encoded); // Output: 542 (42 shifted left by 4, combined with 10)
// console.log(decoded); // Output: [42, 10]

// ////////////////////
// function encodenjString(inputString:any) {
//     const charArray = inputString.split('');
//     const encodedArray = charArray.map((char:any) => char.charCodeAt(0) % 4 + 1);
//     return encodedArray;
// }

// function decodeArray(encodedArray:any) {
//     const decodedString = encodedArray.map((code:any) => String.fromCharCode((code - 1) + 48)).join('');
//     return decodedString;
// }

// // Example Usage:
// const inputSt44ring = "Hello";
// const encodedArrayyy = encodenjString(inputSt44ring);
// console.log("Encoded Array:", encodedArrayyy);

// const decodedShhtring = decodeArray(encodedArrayyy);
// console.log("Decoded String:", decodedShhtring);

// // Example Usage:
// const inputString = "Hello";
// const encodedArray = encodenjString(inputString);
// console.log("Encoded Array:", encodedArray);

// const decodedString = decodeArray(encodedArray);
// console.log("Decoded String:", decodedString);
