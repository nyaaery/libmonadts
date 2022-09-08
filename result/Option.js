"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = exports.Some = void 0;
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
