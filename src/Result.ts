export type Ok<T> = OkImpl & {
    value: T
}

export type Err<E> = ErrImpl & {
    value: E
}

export type Result<T, E> = Ok<T> | Err<E>;

type ResultMatchBlock_<T, E, A> = { Ok(value: T): A, Err(value: E): A };

type ResultMatchBlock<T, E, A> = ResultMatchBlock_<T, E, A> | (Partial<ResultMatchBlock_<T, E, A>> & { _(): A });

class ResultImpl {
    match<T, E, A, X extends A | Promise<A>>(this: Result<T, E>, block: ResultMatchBlock<T, E, X>): X {
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

    bind<T, E, A, B, X extends Result<A, B> | Promise<Result<A, B>>>(this: Result<T, E>, f: (value: T) => X): X | Err<E> {
        if (this.Ok()) {
            return f(this.value);
        } else {
            return this;
        }
    }
}

class OkImpl extends ResultImpl {
    Ok<T, E>(this: Result<T, E>): this is Ok<T> {
        return true;
    }

    Err<T, E>(this: Result<T, E>): this is Err<E> {
        return false;
    }
}

class ErrImpl extends ResultImpl {
    Ok<T, E>(this: Result<T, E>): this is Ok<T> {
        return false;
    }

    Err<T, E>(this: Result<T, E>): this is Err<E> {
        return true;
    }
}

const ok_impl = new OkImpl();
const err_impl = new ErrImpl();

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

export function Result<T>(f: () => T): Result<T, unknown> {
    try {
        return Ok(f());
    } catch (err) {
        return Err(err);
    }
}
