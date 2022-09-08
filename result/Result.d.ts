export declare type Ok<T> = InstanceType<typeof ok_impl_constructor> & {
    value: T;
};
export declare type Err<E> = InstanceType<typeof err_impl_constructor> & {
    value: E;
};
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
        match<T_2, E_2, A, X extends A | Promise<A>>(this: _Result<T_2, E_2>, block: ResultMatchBlock<T_2, E_2, X>): X;
        bind<T_3, E_3, A_1, B, X_1 extends _Result<A_1, B> | Promise<_Result<A_1, B>>>(this: _Result<T_3, E_3>, f: (value: T_3) => X_1): X_1 | Err<E_3>;
    };
};
declare type _Err<T> = Err<T>;
declare const err_impl_constructor: {
    new (): {
        Ok<T, E>(this: Result<T, E>): this is Ok<T>;
        Err<T_1, E_1>(this: Result<T_1, E_1>): this is _Err<E_1>;
        match<T_2, E_2, A, X extends A | Promise<A>>(this: _Result<T_2, E_2>, block: ResultMatchBlock<T_2, E_2, X>): X;
        bind<T_3, E_3, A_1, B, X_1 extends _Result<A_1, B> | Promise<_Result<A_1, B>>>(this: _Result<T_3, E_3>, f: (value: T_3) => X_1): X_1 | Err<E_3>;
    };
};
export declare function Ok<T>(value: T): Ok<T>;
export declare function Err<E>(value: E): Err<E>;
export declare function Result<T>(f: () => T): Result<T, unknown>;
export {};
