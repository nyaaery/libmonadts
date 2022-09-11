import { Option } from "./Option";
declare enum OkDistinctor {
    _ = 0
}
export declare type Ok<T> = InstanceType<typeof ok_impl_constructor> & {
    value: T;
} & OkDistinctor;
declare enum ErrDistinctor {
    _ = 0
}
export declare type Err<E> = InstanceType<typeof err_impl_constructor> & {
    value: E;
} & ErrDistinctor;
export declare type Result<T, E> = Ok<T> | Err<E>;
declare type ResultMatchBlock_<T, E, A> = {
    Ok(value: T): A;
    Err(value: E): A;
};
declare type ResultMatchBlock<T, E, A> = ResultMatchBlock_<T, E, A> | (Partial<ResultMatchBlock_<T, E, A>> & {
    _(): A;
});
declare type _Result<T, E> = Result<T, E>;
declare type _Ok<T> = Ok<T>;
declare const ok_impl_constructor: {
    new (): {
        Ok<T, E>(this: Result<T, E>): this is _Ok<T>;
        Err<T_1, E_1>(this: Result<T_1, E_1>): this is Err<E_1>;
        match<X extends A | Promise<A>, T_2, E_2, A>(this: _Result<T_2, E_2>, block: ResultMatchBlock<T_2, E_2, X>): X;
        bind<X_1 extends _Result<A_1, B> | Promise<_Result<A_1, B>>, T_3, E_3, A_1, B>(this: _Result<T_3, E_3>, f: (value: T_3) => X_1): X_1 | Err<E_3>;
        bind_err<X_2 extends _Result<A_2, B_1> | Promise<_Result<A_2, B_1>>, T_4, E_4, A_2, B_1>(this: _Result<T_4, E_4>, f: (err: E_4) => X_2): X_2 | Ok<T_4>;
        ok<T_5, E_5>(this: _Result<T_5, E_5>): Option<T_5>;
        err<T_6, E_6>(this: _Result<T_6, E_6>): Option<E_6>;
    };
};
declare type _Err<T> = Err<T>;
declare const err_impl_constructor: {
    new (): {
        Ok<T, E>(this: Result<T, E>): this is Ok<T>;
        Err<T_1, E_1>(this: Result<T_1, E_1>): this is _Err<E_1>;
        match<X extends A | Promise<A>, T_2, E_2, A>(this: _Result<T_2, E_2>, block: ResultMatchBlock<T_2, E_2, X>): X;
        bind<X_1 extends _Result<A_1, B> | Promise<_Result<A_1, B>>, T_3, E_3, A_1, B>(this: _Result<T_3, E_3>, f: (value: T_3) => X_1): X_1 | Err<E_3>;
        bind_err<X_2 extends _Result<A_2, B_1> | Promise<_Result<A_2, B_1>>, T_4, E_4, A_2, B_1>(this: _Result<T_4, E_4>, f: (err: E_4) => X_2): X_2 | Ok<T_4>;
        ok<T_5, E_5>(this: _Result<T_5, E_5>): Option<T_5>;
        err<T_6, E_6>(this: _Result<T_6, E_6>): Option<E_6>;
    };
};
export declare function Ok<T>(value: T): Ok<T>;
export declare function Err<E>(value: E): Err<E>;
export declare const Result: {
    <T>(f: () => T): Result<T, unknown>;
    try<T>(f: () => T): Result<T, unknown>;
    from_promise<T>(promise: Promise<T>): Promise<Result<T, unknown>>;
};
export {};
