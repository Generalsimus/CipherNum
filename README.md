### DbView APP



#### Number


```ts
import { createNumberCipher } from "./number";

const cipher = createNumberCipher({
    characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    wordLength: 5,
});

const testNumber = 55555555

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "eBKZy"
const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 55555555
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
import { createNumberCipher } from "./number";

const cipher = createNumberCipher();

const testNumber = 8234346565437

const encodedAsString = cipher.encode(testNumber);
// encodedAsString = "ݽ䑇谇" 

const decodedAsNumber = cipher.decode(encodedAsString);
// decodedAsNumber = 8234346565437
```
