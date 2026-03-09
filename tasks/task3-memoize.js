/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    //вообще ещё можно доп проверку сделать типо такой

    // for (const arg of args) {
    //   if (typeof arg !== "string" && typeof arg !== "number") {
    //     throw new TypeError("Аргументы должны быть только строками или числами");
    //   }
    // }

    // вариант с сохранением типа 1
    const key = JSON.stringify(args);

    //есть вариант 2 ещё такой, какой лучше не знаю, без ts уже непривычно такое делать

    // const key = args.map(arg => `${typeof arg}:${arg}`).join(";");

    if (cache.has(key)) {
      console.log("из кэша");
      return cache.get(key);
    }

    const result = fn.apply(this, args);

    cache.set(key, result);
    return result;
  };
}

const slowAdd = (a, b) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);

console.log(memoAdd(1, 2)); // возвращает 3
console.log(memoAdd(1, 2)); // из кэша, возвращает 3

// свои тесты

// тест строк
const joinStrings = (a, b) => {
  console.log("тест строк");
  return a + " " + b;
};

const memoJoin = memoize(joinStrings);

console.log(memoJoin("Hello", "World"));
console.log(memoJoin("Hello", "World"));

// тест строк и чисел
const biuldObj = (name, age) => {
  console.log("тест со строкой и числами");
  return `${name} (${age})`;
};

const memoObj = memoize(biuldObj);

console.log(memoObj("test", 1));
console.log(memoObj("test", 1));

// после правок тест

const fn = (x) => typeof x;

const memoFn = memoize(fn);

console.log(memoFn(100)); // "number"
console.log(memoFn("100")); // теперь "string"

console.log(memoFn(100)); // "number" из кэша
