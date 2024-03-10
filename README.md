### CipherNum

## Usage

### Number Encryption

#### Example 1

This example demonstrates how to use the number encryption functionality provided by DbView APP. It imports the `createNumberCipher` function from the `number` module and creates a cipher with specified characters and word length. Then, it encodes a test number and decodes the encoded string back to the original number.


#### Number


```ts
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
```


```ts
import { createNumberCipher } from "./number";

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
import { createNumberCipher } from "./number";

const cipher = createNumberCipher();

const testNumber = 8234346565437

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "ݽ䑇谇" 

const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 8234346565437
```

#### Bigint
```ts
import { createBigintCipher } from "./bigint";

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
import { createBigintCipher } from "./bigint";

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
import { createBigintCipher } from "./bigint";

const cipher = createBigintCipher()

const testNumber = 8234346565437n

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "ݽ䑇谇" 

const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 8234346565437n
```
