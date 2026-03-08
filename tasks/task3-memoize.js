/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = fn(...args);
    if (cache.has(key)) {
      console.log('Из кэша');
      return cache.get(key);
    }
    console.log('Вычисляем результат');
    cache.set(key, fn(...args));
    return cache.get(key);
  }
}

const slowAdd = (a, b) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);
memoAdd(1, 2); // возвращает 3
memoAdd(1, 2); // из кэша, возвращает 3