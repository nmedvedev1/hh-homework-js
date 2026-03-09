/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const cache = new Map();
  return function(...args){
    const key = args.join(',');
    if (cache.has(key)) {
      console.log('кэш:');
      return cache.get(key);
    }
    const result = fn(...args);
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