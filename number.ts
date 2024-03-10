import { createNumberPermutations } from "./utils";

interface Options {
    characters?: string;
    wordLength?: number;
}
export type EnCodeDecodeNumberOptions = Options


export interface EnCodeDecodeNumber {
    encode: (decodeNumber: number) => string;
    decode: (encodeString: string) => number;
}

export const createNumberCipher = (options?: EnCodeDecodeNumberOptions) => {
    if (options === undefined) {
        return createCipherNumberToString()
    }
    const { characters, wordLength } = options
    if (typeof characters === "string" && typeof wordLength === "number") {
        return createCipherNumberToWord({ characters, wordLength });
    }
    if (typeof characters === "string") {
        return createCipherNumberToCharString({ characters });
    }
    if (typeof wordLength === "number") {
        return createCipherNumberToMaxChars({ wordLength })
    }
    return createCipherNumberToString()
};
const createCipherNumberToString = (): EnCodeDecodeNumber => {

    const charLengthInJS = 65535;
    return {
        encode: (decodeNumber) => {
            const base = charLengthInJS;
            let encodedString = "";

            while (decodeNumber > 0) {
                const remainder = decodeNumber % base;
                encodedString = String.fromCharCode(remainder) + encodedString;
                decodeNumber = Math.floor(decodeNumber / base);
            }

            return encodedString;
        },
        decode: (encodeString) => {
            const base = charLengthInJS;
            let decodedNumber = 0;

            for (let i = 0; i < encodeString.length; i++) {
                const index = encodeString.charCodeAt(i);

                decodedNumber += index * base ** (encodeString.length - i - 1);
            }

            return decodedNumber;
        },
    };
};
const createCipherNumberToCharString = ({
    characters,
}: Required<Omit<EnCodeDecodeNumberOptions, "wordLength">>): EnCodeDecodeNumber => {
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

const createCipherNumberToWord = ({
    characters,
    wordLength,
}: Required<EnCodeDecodeNumberOptions>): EnCodeDecodeNumber => {
    const charArray = characters.split("");
    const permutations = createNumberPermutations(charArray.length, wordLength);

    return {
        encode: (decodeNumber) => {
            const characters = [...charArray];

            let permutation = "";

            for (let i = 0; i < wordLength; i++) {
                const remainingPermutations = permutations[i];

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
                const remainingPermutations = permutations[i];

                index += characterIndex * remainingPermutations;

                characters.splice(characterIndex, 1);
            }

            return index;
        },
    };
};





const createCipherNumberToMaxChars = ({
    wordLength,
}: Required<Omit<EnCodeDecodeNumberOptions, "characters">>): EnCodeDecodeNumber => {
    const charLengthInJS = 65535;

    const permutations = createNumberPermutations(charLengthInJS, wordLength)

    return {
        encode: (decodeNumber) => {
            let permutation = "";

            for (let i = 0; i < wordLength; i++) {
                const remainingPermutations = permutations[i];
                const characterIndex = decodeNumber / remainingPermutations / 1


                permutation += String.fromCharCode(characterIndex);


                decodeNumber %= remainingPermutations;
            }

            return permutation;
        },
        decode: (encodeString) => {
            let index = 0;

            for (let i = 0; i < wordLength; i++) {
                const characterIndex = encodeString.charCodeAt(i);

                const remainingPermutations = permutations[i];

                index += characterIndex * remainingPermutations;
            }

            return index;
        },
    };
};