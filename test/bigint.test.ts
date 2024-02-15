import { describe, expect, test } from "@jest/globals";
import { createBigintCipher } from "../bigint";

const maxTestCharLength = 65535;
const maxWordLength = 5n;

const eachDiapasons = (call: (num: bigint) => void) => {
  const len = 5000;
  for (let i = 0; i < len; i++) {
    const start = Math.max(Math.round(Math.random() * Number.MAX_SAFE_INTEGER) - 100, 0);
    const end = start + 100;

    for (let j = start; j < end; j++) {
      call(BigInt(j));
    }
  }
  return;
};

const characters = Array.from(Array(maxTestCharLength), (_, i) =>
  String.fromCharCode(i)
).join("");

describe("Number Cipher", () => {
  test("createBigintCipher({ characters, wordLength });", () => {
    const cipher = createBigintCipher({
      characters: characters,
      wordLength: maxWordLength,
    });

    eachDiapasons((num) => {
      const str = cipher.encode(num);
      const decodedNum = cipher.decode(str);
      expect(decodedNum).toBe(num);
    });

  });

  test("createBigintCipher({ characters });", () => {
    const cipher = createBigintCipher({
      characters: characters,
    });

    eachDiapasons((num) => {
      const str = cipher.encode(num);
      const decodedNum = cipher.decode(str);
      expect(decodedNum).toBe(num);
    });
  });

  test("createBigintCipher({ wordLength });", () => {
    const cipher = createBigintCipher({
      wordLength: maxWordLength,
    });
    eachDiapasons((num) => {
      const str = cipher.encode(num);
      const decodedNum = cipher.decode(str);
      expect(decodedNum).toBe(num);
    })
  });
  test("createBigintCipher();", () => {
    const cipher = createBigintCipher();
    eachDiapasons((num) => {
      const str = cipher.encode(num);
      const decodedNum = cipher.decode(str);
      expect(decodedNum).toBe(num);
    })
  });

});
