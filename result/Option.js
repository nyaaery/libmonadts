"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = exports.None = exports.Some = void 0;
var SomeDistinctor;
(function (SomeDistinctor) {
    SomeDistinctor[SomeDistinctor["_"] = 0] = "_";
})(SomeDistinctor || (SomeDistinctor = {}));
var NoneDistinctor;
(function (NoneDistinctor) {
    NoneDistinctor[NoneDistinctor["_"] = 0] = "_";
})(NoneDistinctor || (NoneDistinctor = {}));
const option_impl_constructor = class Option {
    match(block) {
        if ("_" in block) {
            if (block.Some !== undefined && this.Some()) {
                return block.Some(this.value);
            }
            else if (block.None !== undefined && this.None()) {
                return block.None();
            }
            else {
                return block._();
            }
        }
        else {
            if (this.Some()) {
                return block.Some(this.value);
            }
            else {
                return block.None();
            }
        }
    }
    bind(f) {
        if (this.Some()) {
            return f(this.value);
        }
        else {
            return this;
        }
    }
    bind_none(f) {
        if (this.None()) {
            return f();
        }
        else {
            return this;
        }
    }
};
const some_impl_constructor = class Some extends option_impl_constructor {
    Some() {
        return true;
    }
    None() {
        return false;
    }
};
const none_impl_constructor = class None extends option_impl_constructor {
    Some() {
        return false;
    }
    None() {
        return true;
    }
};
const some_impl = new some_impl_constructor();
const none_impl = new none_impl_constructor();
function Some(value) {
    const some = Object.create(some_impl);
    some.value = value;
    return some;
}
exports.Some = Some;
exports.None = Object.create(none_impl);
exports.Option = (function (optional) {
    if (optional === undefined) {
        return exports.None;
    }
    else {
        return Some(optional);
    }
});
exports.Option.from_optional = function (optional) {
    return (0, exports.Option)(optional);
};
exports.Option.from_nullable = function (nullable) {
    if (nullable === null) {
        return exports.None;
    }
    else {
        return Some(nullable);
    }
};
exports.Option.from_nullish = function (nullish) {
    if (nullish === null || nullish === undefined) {
        return exports.None;
    }
    else {
        return Some(nullish);
    }
};
