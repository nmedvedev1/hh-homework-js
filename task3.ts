/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

type PrimitiveArg = string | number;

function memoize<TThis, TArgs extends PrimitiveArg[], TResult>(
  fn: (this: TThis, ...args: TArgs) => TResult
): (this: TThis, ...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();

  return function (this: TThis, ...args: TArgs): TResult {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key) as TResult;
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

const slowAdd = (a: number, b: number): number => {
  return a + b;
};

const memoAdd = memoize(slowAdd);

console.log(memoAdd(1, 2)); // возвращает 3
console.log(memoAdd(1, 2)); // из кэша, возвращает 3