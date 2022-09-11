enum OkDistinctor { _ }
export type Ok<T> = InstanceType<typeof ok_impl_constructor> & {
    value: T
} & OkDistinctor;

enum ErrDistinctor { _ }
export type Err<E> = InstanceType<typeof err_impl_constructor> & {
    value: E
} & ErrDistinctor;

export type Result<T, E> = Ok<T> | Err<E>;

type ResultMatchBlock_<T, E, A> = { Ok(value: T): A, Err(value: E): A };

type ResultMatchBlock<T, E, A> = ResultMatchBlock_<T, E, A> | (Partial<ResultMatchBlock_<T, E, A>> & { _(): A });

type _Result<T, E> = Result<T, E>;
const result_impl_constructor = class Result {
    match<T, E, A, X extends A | Promise<A>>(this: _Result<T, E>, block: ResultMatchBlock<T, E, X>): X {
        if ("_" in block) {
            if (block.Ok !== undefined && this.Ok()) {
                return block.Ok(this.value);
            } else if (block.Err !== undefined && this.Err()) {
                return block.Err(this.value);
            } else {
                return block._();
            }
        } else {
            if (this.Ok()) {
                return block.Ok(this.value);
            } else {
                return block.Err(this.value);
            }
        }
    }

    bind<T, E, A, B, X extends _Result<A, B> | Promise<_Result<A, B>>>(this: _Result<T, E>, f: (value: T) => X): X | Err<E> {
        if (this.Ok()) {
            return f(this.value);
        } else {
            return this;
        }
    }
}

type _Ok<T> = Ok<T>;
const ok_impl_constructor = class Ok extends result_impl_constructor {
    Ok<T, E>(this: Result<T, E>): this is _Ok<T> {
        return true;
    }

    Err<T, E>(this: Result<T, E>): this is Err<E> {
        return false;
    }
}

type _Err<T> = Err<T>;
const err_impl_constructor = class Err extends result_impl_constructor {
    Ok<T, E>(this: Result<T, E>): this is Ok<T> {
        return false;
    }

    Err<T, E>(this: Result<T, E>): this is _Err<E> {
        return true;
    }
}

const ok_impl = new ok_impl_constructor();
const err_impl = new err_impl_constructor();

export function Ok<T>(value: T): Ok<T> {
    const ok = Object.create(ok_impl);
    ok.value = value;
    return ok;
}

export function Err<E>(value: E): Err<E> {
    const err = Object.create(err_impl);
    err.value = value;
    return err;
}

export const Result: {
    <T>(f: () => T): Result<T, unknown>,
    try<T>(f: () => T): Result<T, unknown>,
    from_promise<T>(promise: Promise<T>): Promise<Result<T, unknown>>
} = (function <T>(f: () => T): Result<T, unknown> {
    try {
        return Ok(f());
    } catch (err) {
        return Err(err);
    }
}) as any;

Result.try = function <T>(f: () => T): Result<T, unknown> {
    return Result(f);
}

Result.from_promise = async function <T>(promise: Promise<T>): Promise<Result<T, unknown>> {
    return promise.then(Ok).catch(Err);
}
