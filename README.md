### CipherNum

[![Standard JS][standard-js-src]][standard-js-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

<!-- Refs -->
[standard-js-src]: https://img.shields.io/badge/license-MIT-brightgreen?&style=flat-square
[standard-js-href]: https://github.com/Generalsimus/CipherNum/blob/master/LICENSE

[npm-version-src]: https://img.shields.io/npm/v/ciphernum?&style=flat-square
[npm-version-href]: https://www.npmjs.com/package/ciphernum

[npm-downloads-src]: https://img.shields.io/npm/dt/ciphernum?&style=flat-square
[npm-downloads-href]: https://www.npmjs.com/package/ciphernum

[bundle-phobia-src]: https://img.shields.io/bundlephobia/min/ciphernum?&style=flat-square&color=red
[bundle-phobia-href]: https://packagephobia.com/result?p=ciphernum

## Usage
The CipherNum npm package offers a unique solution for converting numbers into a string of characters and accurately recovering the original numbers from these character strings. This conversion process works seamlessly with both standard numbers and BigInts, compact data representation, or any scenario where numbers need to be converted to a non-standard string format for storage, transmission, or processing, and then precisely recovered.

### Number Encryption

#### Number


```ts
import { createNumberCipher } from "ciphernum";

const cipher = createNumberCipher({
    characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    wordLength: 5,
});

const testNumber = 523827512

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "PZqz0"
const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 523827512
```


```ts
import { createNumberCipher } from "ciphernum";

const cipher = createNumberCipher({
    wordLength: 5,
});

const testNumber = 432543261234

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "\x00\x00d뤝" 

const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 432543261234
```

```ts
import { createNumberCipher } from "ciphernum";

const cipher = createNumberCipher();

const testNumber = 8234346565437

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "ݽ䑇谇" 

const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 8234346565437
```

#### Bigint
```ts
import { createBigintCipher } from "ciphernum";

const cipher = createBigintCipher({
  characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  wordLength: 5n,
});

const testNumber = 523412315n;

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "JAlCh"
const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 523412315n
```

```ts
import { createBigintCipher } from "ciphernum";

const cipher = createBigintCipher({
  wordLength: 5n,
});

const testNumber = 43253461232122443261234n;

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "नﮌ\ud899"

const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 43253461232122443261234n
```

```ts
import { createBigintCipher } from "ciphernum";

const cipher = createBigintCipher()

const testNumber = 8234346565437n

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "ݽ䑇谇" 

const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 8234346565437n
```
