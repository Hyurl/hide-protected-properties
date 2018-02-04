# Hide-Protected-Properties

**Hide properties of a class/instance that start with an underline, which are**
**often seemed as protected or private.**

## Example

```javascript
const HideProtectedProperties = require("hide-protected-properties");
const { EventEmitter } = require("events");

var sym = Symbol("");

class Test extends EventEmitter {
    constructor() {
        super();
        this.text = "Hello, World!";
        this._shouldHide = "Hi, everyone!";
        this[sym] = "Also hide!";
    }
}

HideProtectedProperties(Test);

console.log(Test); // => [Function: Test]
console.log(new Test); // => Test { text: 'Hello, World!' }
```

```typescript
import HideProtectedProperties = require("hide-protected-properties");

@HideProtectedProperties
class Test extends EventEmitter {
    // ...
}
```

**Notice**: this function won't delete any property of the class, just hides 
them when logging to the console.