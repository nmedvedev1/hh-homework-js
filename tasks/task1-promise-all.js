/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = new Array(promises.length);
    let count = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }
    for (let i = 0; i < promises.length; i++) {
      let promise = promises[i];

      Promise.resolve(promise)
        .then((value) => {
          results[i] = value;
          count++;

          if (count === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]

promiseAll([]).then(console.log);