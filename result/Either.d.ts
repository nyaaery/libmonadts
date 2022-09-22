import { Option } from "./Option";
declare enum LeftDistinctor {
    _ = 0
}
export declare type Left<L> = InstanceType<typeof left_impl_constructor> & {
    value: L;
} & LeftDistinctor;
declare enum RightDistinctor {
    _ = 0
}
export declare type Right<R> = InstanceType<typeof right_impl_constructor> & {
    value: R;
} & RightDistinctor;
export declare type Either<L, R> = Left<L> | Right<R>;
declare type EitherMatchBlock_<L, R, A> = {
    Left(value: L): A;
    Right(value: R): A;
};
declare type EitherMatchBlock<L, R, A> = EitherMatchBlock_<L, R, A> | (Partial<EitherMatchBlock_<L, R, A>> & {
    _(): A;
});
declare type _Either<L, R> = Either<L, R>;
declare type _Left<L> = Left<L>;
declare const left_impl_constructor: {
    new (): {
        Left<L, R>(this: Either<L, R>): this is _Left<L>;
        Right<L_1, R_1>(this: Either<L_1, R_1>): this is Right<R_1>;
        match<X extends A | Promise<A>, L_2, R_2, A>(this: _Either<L_2, R_2>, block: EitherMatchBlock<L_2, R_2, X>): X;
        bind_left<X_1 extends _Either<A_1, B> | Promise<_Either<A_1, B>>, L_3, R_3, A_1, B>(this: _Either<L_3, R_3>, f: (value: L_3) => X_1): X_1 | Right<R_3>;
        bind_right<X_2 extends _Either<A_2, B_1> | Promise<_Either<A_2, B_1>>, L_4, R_4, A_2, B_1>(this: _Either<L_4, R_4>, f: (value: R_4) => X_2): X_2 | Left<L_4>;
        left<L_5, R_5>(this: _Either<L_5, R_5>): Option<L_5>;
        right<L_6, R_6>(this: _Either<L_6, R_6>): Option<R_6>;
    };
};
declare type _Right<L> = Right<L>;
declare const right_impl_constructor: {
    new (): {
        Left<L, R>(this: Either<L, R>): this is Left<L>;
        Right<L_1, R_1>(this: Either<L_1, R_1>): this is _Right<R_1>;
        match<X extends A | Promise<A>, L_2, R_2, A>(this: _Either<L_2, R_2>, block: EitherMatchBlock<L_2, R_2, X>): X;
        bind_left<X_1 extends _Either<A_1, B> | Promise<_Either<A_1, B>>, L_3, R_3, A_1, B>(this: _Either<L_3, R_3>, f: (value: L_3) => X_1): X_1 | Right<R_3>;
        bind_right<X_2 extends _Either<A_2, B_1> | Promise<_Either<A_2, B_1>>, L_4, R_4, A_2, B_1>(this: _Either<L_4, R_4>, f: (value: R_4) => X_2): X_2 | Left<L_4>;
        left<L_5, R_5>(this: _Either<L_5, R_5>): Option<L_5>;
        right<L_6, R_6>(this: _Either<L_6, R_6>): Option<R_6>;
    };
};
export declare function Left<L>(value: L): Left<L>;
export declare function Right<R>(value: R): Right<R>;
export {};
