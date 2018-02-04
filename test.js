const HideProtectedProperties = require("./");
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

console.log(Test);
console.log(new Test);