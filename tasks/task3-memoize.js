/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            // console.log("cached")
            return cache.get(key);
        }
        // console.log("not in cache, executing..")

        const result = fn(...args);
        cache.set(key, result);

        return result;
    }
}

const slowAdd = (a, b) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);
console.log(memoAdd(1, 2)); // возвращает 3
console.log(memoAdd(1, 2)); // из кэша, возвращает 3