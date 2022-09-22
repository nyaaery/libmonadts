import { Option, Some, None } from "./Option";

enum LeftDistinctor { _ }
export type Left<L> = InstanceType<typeof left_impl_constructor> & {
    value: L
} & LeftDistinctor;

enum RightDistinctor { _ }
export type Right<R> = InstanceType<typeof right_impl_constructor> & {
    value: R
} & RightDistinctor;

export type Either<L, R> = Left<L> | Right<R>;

type EitherMatchBlock_<L, R, A> = { Left(value: L): A, Right(value: R): A };

type EitherMatchBlock<L, R, A> = EitherMatchBlock_<L, R, A> | (Partial<EitherMatchBlock_<L, R, A>> & { _(): A });

type _Either<L, R> = Either<L, R>;
const either_impl_constructor = class Either {
    match<X extends A | Promise<A>, L, R, A>(this: _Either<L, R>, block: EitherMatchBlock<L, R, X>): X {
        if ("_" in block) {
            if (block.Left !== undefined && this.Left()) {
                return block.Left(this.value);
            } else if (block.Right !== undefined && this.Right()) {
                return block.Right(this.value);
            } else {
                return block._();
            }
        } else {
            if (this.Left()) {
                return block.Left(this.value);
            } else {
                return block.Right(this.value);
            }
        }
    }

    bind_left<X extends _Either<A, B> | Promise<_Either<A, B>>, L, R, A, B>(this: _Either<L, R>, f: (value: L) => X): X | Right<R> {
        if (this.Left()) {
            return f(this.value);
        } else {
            return this;
        }
    }

    bind_right<X extends _Either<A, B> | Promise<_Either<A, B>>, L, R, A, B>(this: _Either<L, R>, f: (value: R) => X): X | Left<L> {
        if (this.Right()) {
            return f(this.value);
        } else {
            return this;
        }
    }

    left<L, R>(this: _Either<L, R>): Option<L> {
        if (this.Left()) {
            return Some(this.value);
        } else {
            return None;
        }
    }

    right<L, R>(this: _Either<L, R>): Option<R> {
        if (this.Right()) {
            return Some(this.value);
        } else {
            return None;
        }
    }
}

type _Left<L> = Left<L>;
const left_impl_constructor = class Left extends either_impl_constructor {
    Left<L, R>(this: Either<L, R>): this is _Left<L> {
        return true;
    }

    Right<L, R>(this: Either<L, R>): this is Right<R> {
        return false;
    }
}

type _Right<L> = Right<L>;
const right_impl_constructor = class Right extends either_impl_constructor {
    Left<L, R>(this: Either<L, R>): this is Left<L> {
        return false;
    }

    Right<L, R>(this: Either<L, R>): this is _Right<R> {
        return true;
    }
}

const left_impl = new left_impl_constructor();
const right_impl = new right_impl_constructor();

export function Left<L>(value: L): Left<L> {
    const left = Object.create(left_impl);
    left.value = value;
    return left;
}

export function Right<R>(value: R): Right<R> {
    const right = Object.create(right_impl);
    right.value = value;
    return right;
}
