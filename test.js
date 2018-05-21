"use strict";

var HideProtectedProperties = require("./");
var EventEmitter = require("events").EventEmitter;
var assert = require("assert");
var util = require("util");
var inspect = util.inspect.custom || "inspect";
var isNode66 = parseFloat(process.version.slice(1)) >= 6.6;

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

assert.equal(util.format(Test), "[Function: Test]");
assert.equal(typeof Test[inspect], "function");
assert.equal(typeof Test.prototype[inspect], "function");
assert.equal(util.format(new Test), "Test { text: 'Hello, World!' }");

console.log("#### OK ####");