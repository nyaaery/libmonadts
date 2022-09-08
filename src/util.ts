export type ConstructorReturnType<T extends new (..._: any) => any> = T extends new (..._: any) => infer R ? R : never;
