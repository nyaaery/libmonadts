export type Some<T> = InstanceType<typeof some_impl_constructor> & {
    value: T
}

// None must be an opaque type.
// Otherwise, TypeScript treats None as identical to the none_impl_constructor class.
// Which appears to result in the Option#None return type signatire being replace with (this is any) in the declaration files.
// (Presumably because of infinite recursion.)
// This breaks the type guard.
enum NoneDistinctor { _ }
export type None = InstanceType<typeof none_impl_constructor> & NoneDistinctor;

export type Option<T> = Some<T> | None;

type OptionMatchBlock_<T, A> = { Some(value: T): A, None(): A };

type OptionMatchBlock<T, A> = OptionMatchBlock_<T, A> | (Partial<OptionMatchBlock_<T, A>> & { _(): A });

type _Option<T> = Option<T>;
const option_impl_constructor = class Option {
    match<T, A, X extends A | Promise<A>>(this: _Option<T>, block: OptionMatchBlock<T, X>): X {
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

    bind<T, A, X extends _Option<A> | Promise<_Option<A>>>(this: _Option<T>, f: (value: T) => X): X | None {
        if (this.Some()) {
            return f(this.value);
        } else {
            return this;
        }
    }
}

type _Some<T> = Some<T>;
const some_impl_constructor = class Some extends option_impl_constructor {
    Some<T>(this: Option<T>): this is _Some<T> {
        return true;
    }

    None<T>(this: Option<T>): this is None {
        return false;
    }
}

type _None = None;
const none_impl_constructor = class None extends option_impl_constructor {
    Some<T>(this: Option<T>): this is Some<T> {
        return false;
    }

    None<T>(this: Option<T>): this is _None {
        return true;
    }
}

const some_impl = new some_impl_constructor();
const none_impl = new none_impl_constructor();

export function Some<T>(value: T): Some<T> {
    const some = Object.create(some_impl);
    some.value = value;
    return some;
}

export const None: None = Object.create(none_impl);

export const Option: {
    <T>(optional: T | undefined): Option<T>,
    from_optional<T>(optional: T | undefined): Option<T>,
    from_nullable<T>(nullable: T | null): Option<T>,
    from_nullish<T>(nullish: T | null | undefined): Option<T>
} = (function <T>(optional: T | undefined): Option<T> {
    if (optional === undefined) {
        return None;
    } else {
        return Some(optional);
    }
}) as any;

Option.from_optional = function <T>(optional: T | undefined): Option<T> {
    return Option(optional);
}

Option.from_nullable = function <T>(nullable: T | null): Option<T> {
    if (nullable === null) {
        return None;
    } else {
        return Some(nullable);
    }
}

Option.from_nullish = function <T>(nullish: T | null | undefined): Option<T> {
    if (nullish === null || nullish === undefined) {
        return None;
    } else {
        return Some(nullish);
    }
}
