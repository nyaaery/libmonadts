import { ConstructorReturnType } from "./util";
export declare type Some<T> = ConstructorReturnType<typeof some_impl_constructor> & {
    value: T;
};
export declare type None = ConstructorReturnType<typeof none_impl_constructor>;
export declare type Option<T> = Some<T> | None;
declare type OptionMatchBlock_<T, A> = {
    Some(value: T): A;
    None(): A;
};
declare type OptionMatchBlock<T, A> = OptionMatchBlock_<T, A> | (Partial<OptionMatchBlock_<T, A>> & {
    _(): A;
});
declare type _Option<T> = Option<T>;
declare type _Some<T> = Some<T>;
declare const some_impl_constructor: {
    new (): {
        Some<T>(this: Option<T>): this is _Some<T>;
        None<T_1>(this: Option<T_1>): this is {
            Some<T_2>(this: Option<T_2>): this is Some<T_2>;
            None<T_3>(this: Option<T_3>): this is any;
            match<T_4, A, X extends A | Promise<A>>(this: _Option<T_4>, block: OptionMatchBlock<T_4, X>): X;
            bind<T_5, A_1, X_1 extends _Option<A_1> | Promise<_Option<A_1>>>(this: _Option<T_5>, f: (value: T_5) => X_1): any | X_1;
        };
        match<T_4, A, X extends A | Promise<A>>(this: _Option<T_4>, block: OptionMatchBlock<T_4, X>): X;
        bind<T_5, A_1, X_1 extends _Option<A_1> | Promise<_Option<A_1>>>(this: _Option<T_5>, f: (value: T_5) => X_1): {
            Some<T_2>(this: Option<T_2>): this is Some<T_2>;
            None<T_3>(this: Option<T_3>): this is any;
            match<T_4, A, X extends A | Promise<A>>(this: _Option<T_4>, block: OptionMatchBlock<T_4, X>): X;
            bind<T_5, A_1, X_1 extends _Option<A_1> | Promise<_Option<A_1>>>(this: _Option<T_5>, f: (value: T_5) => X_1): any | X_1;
        } | X_1;
    };
};
declare const none_impl_constructor: {
    new (): {
        Some<T_2>(this: Option<T_2>): this is Some<T_2>;
        None<T_3>(this: Option<T_3>): this is any;
        match<T_4, A, X extends A | Promise<A>>(this: _Option<T_4>, block: OptionMatchBlock<T_4, X>): X;
        bind<T_5, A_1, X_1 extends _Option<A_1> | Promise<_Option<A_1>>>(this: _Option<T_5>, f: (value: T_5) => X_1): any | X_1;
    };
};
export declare function Some<T>(value: T): Some<T>;
export declare const None: None;
export declare const Option: {
    <T>(optional: T | undefined): Option<T>;
    from_optional<T>(optional: T | undefined): Option<T>;
    from_nullable<T>(nullable: T | null): Option<T>;
    from_nullish<T>(nullish: T | null | undefined): Option<T>;
};
export {};
