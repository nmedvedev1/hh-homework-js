/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const cache = new Map();
  return function(...args){
    const context = this;
    const key = args.map(arg => typeof arg + ':' + arg).join('|');
    if (cache.has(key)) {
      console.log('кэш:');
      return cache.get(key);
    }
    const result = fn.apply(context, args);
    cache.set(key, result);
    return result;
  }
}

const slowAdd = (a, b) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);
console.log(memoAdd(1, 2)); // (первый вызов) возвращает 3, 
// потому что в кэше такого ключа не было, сохраняет ('1,2', 3)
console.log(memoAdd(1, 2)); // (второй вызов) из кэша, возвращает 3, 
// потому что при первом вызове мы сохранили, что при '1,2'-> 3, просто достаем без вычислений

const obj = {
  value: 10,
  add(a) {
    return this.value + a;
  }
};

obj.memoAdd = memoize(obj.add);
console.log(obj.memoAdd(5));
console.log(obj.memoAdd(5));

const fn = (x) => typeof x;
const memoFn = memoize(fn);
console.log(memoFn(100)); // "number"
console.log(memoFn("100")); // должно быть "string", у тебя будет number