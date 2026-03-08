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
      reject(new TypeError('промисы должны быть итерируемыми'));
      return;
    }

    const results = [];
    let completedCount = 0;
    const totalPromises = promises.length;

    if (totalPromises === 0) {
      resolve(results);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = value;
          completedCount++;

          if (completedCount === totalPromises) {
            resolve(results);
          }
        },
        (error) => {
          reject(error);
        }
      );
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