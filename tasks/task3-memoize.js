/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const cache = new Map();
  
  function createKey(args) {
    return args.map(arg => `${typeof arg}:${arg}`).join('|');
  }
  
  return function(...args) {
    const key = createKey(args);
    
    if (cache.has(key)) {
      console.log('Из кэша:', key);
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    console.log('Вычислено:', key);
    return result;
  };
}

const slowAdd = (a, b) => {
  console.log('Вычисляю сумму...');
  return a + b;
};

const memoAdd = memoize(slowAdd);

console.log(memoAdd(1, 2)); 
console.log(memoAdd(1, 2)); 
console.log(memoAdd(2, 3)); 
console.log(memoAdd(1, 2)); 

const concat = (a, b) => `${a}-${b}`;
const memoConcat = memoize(concat);

console.log(memoConcat('hello', 'world')); 
console.log(memoConcat('hello', 'world')); 
console.log(memoConcat(123, 'hello')); 

const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);
const memoSum = memoize(sum);

console.log(memoSum(1, 2, 3, 4)); 
console.log(memoSum(1, 2, 3, 4)); 