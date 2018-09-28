declare module 'dict' {
  /**
   * Type for `Map` like object literal where all values have the same type.
   *
   * It also is different from object literal by returning `T` or `undefined`
   * from index access, because this type can not know which keys are present.
   * In case you know/assume/tested that in your code you are accessing an existing key,
   * you need to add type assertion using ` as T` right after index access.
   *
   * - An empty object literal infer to value type `any`.
   * - A prefilled object literal will infer value type from the values (beware of union types).
   * - You can put in the type parameter to avoid inference.
   */
  export type Dict<T = any> = {[key: string]: T | undefined};

  /**
   * Same as `Dict` but only allows read access to all keys.
   *
   * It is not the responsibility of this type (guard) to prevent write access to the properties
   * of the values, make sure to wrap `T` into `Readonly` if needed, e.g.
   *
   * `const dict: ReadonlyDict<Readonly<MyType>> = {};`
   *
   * @see Dict
   */
  export type ReadonlyDict<T> = Readonly<Dict<T>>;
}
