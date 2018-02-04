const { EventEmitter } = require("events");

function HideProtectedProperties(constructor) {
    constructor.prototype.inspect = function inspect() {
        var res = {};
        Object.defineProperty(res, "constructor", {
            value: this.constructor
        });

        for (let key in this) {
            if (key[0] !== "_" && this.hasOwnProperty(key)
                && (!(this instanceof EventEmitter) || key !== "domain")) {
                res[key] = this[key];
            }
        }
        
        return res;
    };

    constructor.inspect = function inspect() {
        var res;
        eval(`res = function ${this.name}(){}`);
        
        for (let key in this) {
            if (key[0] !== "_" && key !== "inspect"
                && this.hasOwnProperty(key)) {
                res[key] = this[key];
            }
        }
        
        return res;
    };
}

module.exports = HideProtectedProperties;