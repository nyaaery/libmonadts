export type Some<T> = SomeImpl & {
    value: T
}

export type None = NoneImpl;

export type Option<T> = Some<T> | None;

type OptionMatchBlock_<T, A> = { Some(value: T): A, None(): A };

type OptionMatchBlock<T, A> = OptionMatchBlock_<T, A> | (Partial<OptionMatchBlock_<T, A>> & { _(): A });

class OptionImpl {
    match<T, A, X extends A | Promise<A>>(this: Option<T>, block: OptionMatchBlock<T, X>): X {
        if ("_" in block) {
            if (block.Some !== undefined && this.Some()) {
                return block.Some(this.value);
            } else if (block.None !== undefined && this.None()) {
                return block.None();
            } else {
                return block._();
            }
        } else {
            if (this.Some()) {
                return block.Some(this.value);
            } else {
                return block.None();
            }
        }
    }

    bind<T, A, X extends Option<A> | Promise<Option<A>>>(this: Option<T>, f: (value: T) => X): X | None {
        if (this.Some()) {
            return f(this.value);
        } else {
            return this;
        }
    }
}

class SomeImpl extends OptionImpl {
    Some<T>(this: Option<T>): this is Some<T> {
        return true;
    }

    None<T>(this: Option<T>): this is None {
        return false;
    }
}

class NoneImpl extends OptionImpl {
    Some<T>(this: Option<T>): this is Some<T> {
        return false;
    }

    None<T>(this: Option<T>): this is None {
        return true;
    }
}

const some_impl = new SomeImpl();
const none_impl = new NoneImpl();

export function Some<T>(value: T): Some<T> {
    const some = Object.create(some_impl);
    some.value = value;
    return some;
}

export const None: None = Object.create(none_impl);
