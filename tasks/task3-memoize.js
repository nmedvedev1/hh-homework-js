/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  // TODO: реализуйте

  let cache = {}

  return function (...args) {

    let key = JSON.stringify(args)

    if (Object.hasOwn(cache, key)) {
      return cache[key]
    } else {

      cache[key] = fn.call(this, ...args)
      return cache[key]
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

function join(a, b) {
  return a + '|' + b;
}

const memoJoin = memoize(join);

console.log(memoJoin('a,b', 'c')); // "a,b|c"
console.log(memoJoin('a', 'b,c')); // ожидал "a|b,c", получил "a,b|c"

const obj = {
  value: 10,
  add(a) {
    return this.value + a;
  }
};

obj.memoAdd = memoize(obj.add);

console.log(obj.memoAdd(5)) // 15

function test(x) {
  return x + '!'
}

const memoTest = memoize(test)

console.log(memoTest('hasOwnProperty'))
console.log(memoTest('hasOwnProperty'))