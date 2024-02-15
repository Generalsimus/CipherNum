import { describe, expect, test } from "@jest/globals";
import { createNumberCipher } from "../number";

const maxTestCharLength = 65535;
const maxWordLength = 5;

const eachDiapasons = (call: (num: number) => void) => {
  const len = 5000;
  for (let i = 0; i < len; i++) {
    const start = Math.max(Math.round(Math.random() * Number.MAX_SAFE_INTEGER) - 100, 0);
    const end = start + 100;

    for (let j = start; j < end; j++) {
      call(j);
    }
  }
  return;
};

const characters = Array.from(Array(maxTestCharLength), (_, i) =>
  String.fromCharCode(i)
).join("");

describe("Number Cipher", () => {
  test("createNumberCipher({ characters, wordLength });", () => {
    const cipher = createNumberCipher({
      characters: characters,
      wordLength: maxWordLength,
    });

    eachDiapasons((num) => {
      const str = cipher.encode(num);
      const decodedNum = cipher.decode(str);
      expect(decodedNum).toBe(num);
    });

  });

  test("createNumberCipher({ characters });", () => {
    const cipher = createNumberCipher({
      characters: characters,
    });

    eachDiapasons((num) => {
      const str = cipher.encode(num);
      const decodedNum = cipher.decode(str);
      expect(decodedNum).toBe(num);
    });
  });

  test("createNumberCipher({ wordLength });", () => {
    const cipher = createNumberCipher({
      wordLength: maxWordLength,
    });
    eachDiapasons((num) => {
      const str = cipher.encode(num);
      const decodedNum = cipher.decode(str);
      expect(decodedNum).toBe(num);
    })
  });
  test("createNumberCipher();", () => {
    const cipher = createNumberCipher();
    eachDiapasons((num) => {
      const str = cipher.encode(num);
      const decodedNum = cipher.decode(str);
      expect(decodedNum).toBe(num);
    })
  });

});
