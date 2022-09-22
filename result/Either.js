"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = exports.Left = void 0;
const Option_1 = require("./Option");
var LeftDistinctor;
(function (LeftDistinctor) {
    LeftDistinctor[LeftDistinctor["_"] = 0] = "_";
})(LeftDistinctor || (LeftDistinctor = {}));
var RightDistinctor;
(function (RightDistinctor) {
    RightDistinctor[RightDistinctor["_"] = 0] = "_";
})(RightDistinctor || (RightDistinctor = {}));
const either_impl_constructor = class Either {
    match(block) {
        if ("_" in block) {
            if (block.Left !== undefined && this.Left()) {
                return block.Left(this.value);
            }
            else if (block.Right !== undefined && this.Right()) {
                return block.Right(this.value);
            }
            else {
                return block._();
            }
        }
        else {
            if (this.Left()) {
                return block.Left(this.value);
            }
            else {
                return block.Right(this.value);
            }
        }
    }
    bind_left(f) {
        if (this.Left()) {
            return f(this.value);
        }
        else {
            return this;
        }
    }
    bind_right(f) {
        if (this.Right()) {
            return f(this.value);
        }
        else {
            return this;
        }
    }
    left() {
        if (this.Left()) {
            return (0, Option_1.Some)(this.value);
        }
        else {
            return Option_1.None;
        }
    }
    right() {
        if (this.Right()) {
            return (0, Option_1.Some)(this.value);
        }
        else {
            return Option_1.None;
        }
    }
};
const left_impl_constructor = class Left extends either_impl_constructor {
    Left() {
        return true;
    }
    Right() {
        return false;
    }
};
const right_impl_constructor = class Right extends either_impl_constructor {
    Left() {
        return false;
    }
    Right() {
        return true;
    }
};
const left_impl = new left_impl_constructor();
const right_impl = new right_impl_constructor();
function Left(value) {
    const left = Object.create(left_impl);
    left.value = value;
    return left;
}
exports.Left = Left;
function Right(value) {
    const right = Object.create(right_impl);
    right.value = value;
    return right;
}
exports.Right = Right;
