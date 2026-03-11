/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  // TODO: реализуйте

  let cache = {}

  return function (...args){

    if (cache.hasOwnProperty(args)){
      return cache[args]
    } else {
      cache[args] = fn(...args)
      return cache[args]
    }
    
  }
}

const slowAdd = (a, b) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);
console.log(memoAdd(1, 2)); // возвращает 3
console.log(memoAdd(1, 2)); // из кэша, возвращает 3

console.log(memoAdd('a', 'b')); // возвращает 3
console.log(memoAdd('a', 'b')); // из кэша, возвращает 3

const slowDis = (a, b) => {
  return a - b;
};

const memoDis = memoize(slowDis);

console.log(memoDis(1, 1)); // возвращает 3
console.log(memoDis(1, 1)); // из кэша, возвращает 3