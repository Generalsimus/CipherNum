import { createBigintPermutations } from "./utils";

interface Options {
    characters?: string;
    wordLength?: bigint;
}
export type EnCodeDecodeBigintOptions = Options


export interface EnCodeDecodeBigint {
    encode: (decodeBigint: bigint) => string;
    decode: (encodeString: string) => bigint;
}

export const createBigintCipher = (options?: EnCodeDecodeBigintOptions) => {
    if (options === undefined) {
        return createCipherBigintToString()
    }
    const { characters, wordLength } = options
    if (typeof characters === "string" && typeof wordLength === "number") {
        return createCipherBigintToWord({ characters, wordLength });
    }
    if (typeof characters === "string") {
        return createCipherBigintToCharString({ characters });
    }
    if (typeof wordLength === "number") {
        return createCipherBigintToMaxChars({ wordLength })
    }
    return createCipherBigintToString()
};
const createCipherBigintToString = (): EnCodeDecodeBigint => {

    const charLengthInJS = 65535n;
    return {
        encode: (decodeBigint) => {
            const base = charLengthInJS;
            let encodedString = "";

            while (decodeBigint > 0) {
                encodedString = String.fromCharCode(Number(decodeBigint % base)) + encodedString;
                decodeBigint = decodeBigint / base
                //  Math.floor(decodeBigint / base);
            }

            return encodedString;
        },
        decode: (encodeString) => {
            const base = charLengthInJS;
            const encodeStringLen = BigInt(encodeString.length)
            let decodedNumber = 0n;

            for (let i = 0; i < encodeString.length; i++) {
                const index = BigInt(encodeString.charCodeAt(i));

                decodedNumber += index * base ** (encodeStringLen - BigInt(i) - 1n);
            }

            return decodedNumber;
        },
    };
};
const createCipherBigintToCharString = ({
    characters,
}: Required<Omit<EnCodeDecodeBigintOptions, "wordLength">>): EnCodeDecodeBigint => {
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

const createCipherBigintToWord = ({
    characters,
    wordLength,
}: Required<EnCodeDecodeBigintOptions>): EnCodeDecodeBigint => {
    const charArray = characters.split("");
    const permutations = createBigintPermutations(BigInt(charArray.length), wordLength);

    return {
        encode: (decodeNumber) => {
            const characters = [...charArray];

            let permutation = "";

            for (let i = 0; i < wordLength; i++) {
                const remainingPermutations = permutations[i];
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
                const remainingPermutations = permutations[i];

                index += BigInt(characterIndex) * remainingPermutations;

                characters.splice(characterIndex, 1);
            }

            return index;
        },
    };
};





const createCipherBigintToMaxChars = ({
    wordLength,
}: Required<Omit<EnCodeDecodeBigintOptions, "characters">>): EnCodeDecodeBigint => {
    const charLengthInJS = 65535n;

    const permutations = createBigintPermutations(charLengthInJS, wordLength)

    return {
        encode: (decodeNumber) => {
            let permutation = "";

            for (let i = 0; i < wordLength; i++) {
                const remainingPermutations = permutations[i];
                const characterIndex = Number(decodeNumber / remainingPermutations / 1n)


                permutation += String.fromCharCode(characterIndex);


                decodeNumber %= remainingPermutations;
            }

            return permutation;
        },
        decode: (encodeString) => {
            let index = 0n;

            for (let i = 0; i < wordLength; i++) {
                const characterIndex = BigInt(encodeString.charCodeAt(i));

                const remainingPermutations = permutations[i];

                index += characterIndex * remainingPermutations;
            }

            return index;
        },
    };
};