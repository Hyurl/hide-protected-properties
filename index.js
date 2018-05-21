var EventEmitter = require("events").EventEmitter;
var fnName = require("util").inspect.custom || "inspect";

function HideProtectedProperties(constructor) {
    constructor.prototype[fnName] = function inspect() {
        var res = {};
        Object.defineProperty(res, "constructor", {
            value: this.constructor
        });

        for (var key in this) {
            if (key[0] !== "_" && this.hasOwnProperty(key)
                && (!(this instanceof EventEmitter) || key !== "domain")) {
                res[key] = this[key];
            }
        }
        
        return res;
    };

    constructor[fnName] = function inspect() {
        var res;
        eval(`res = function ${this.name || ""}(){}`);
        
        for (var key in this) {
            if (key[0] != "_" && key != fnName && this.hasOwnProperty(key)) {
                res[key] = this[key];
            }
        }
        
        return res;
    };
}

module.exports = HideProtectedProperties;