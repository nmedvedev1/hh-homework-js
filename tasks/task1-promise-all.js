/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // Проверка, что передан итерируемый объект
    if (!promises || typeof promises[Symbol.iterator] !== 'function') {
      reject(new TypeError('promises must be iterable'));
      return;
    }

    // преобраз. итерируемого объекта в массив для удобства работы
    const promisesArray = Array.from(promises);
    const results = [];
    let completedCount = 0;
    const totalPromises = promisesArray.length;

    if (totalPromises === 0) {
      resolve(results);
      return;
    }

    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completedCount++;

          if (completedCount === totalPromises) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

// использование
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);
const p4 = Promise.reject('Ошибка!');

promiseAll([p1, p2, p3]).then(console.log); 

promiseAll([p1, p2, p4])
  .then(console.log)
  .catch(error => console.error('Поймали ошибку:', error)); 

promiseAll([1, 2, 3]).then(console.log);

promiseAll([]).then(console.log); 

// Пример с Set
const s = new Set([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]);

promiseAll(s).then(results => {
  console.log('Результаты из Set:', results); 
});

// Пример с Map 
const m = new Map([
  ['a', Promise.resolve('A')],
  ['b', Promise.resolve('B')]
]);

promiseAll(m.values()).then(results => {
  console.log('Результаты из Map:', results);
});

// и со строкой тк тоже итерируемый объект
promiseAll('abc').then(results => {
  console.log('Результаты из строки:', results); 
});