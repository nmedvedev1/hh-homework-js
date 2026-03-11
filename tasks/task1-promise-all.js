/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  const results = [];

  return new Promise((res, rej) => {
    if (!promises.length) return res([]);
    let completed = 0;
    promises.forEach((promise, index) => {
      promise
        .then((elem) => {
          completed++;
          results[index] = elem;
          if (completed === promises.length) {
            res(results);
          }
        })
        .catch((err) => {
          rej(err);
        });
    });
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]
