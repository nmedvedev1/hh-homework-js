/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const resultsOFPromise = [];
    let countOFPromise = 0;
    if (promises.length === 0){
      resolve(resultsOFPromise);
      return
    }
    promises.forEach((promise, i) => {
      Promise.resolve(promise).then(resultOFPromise => {
        resultsOFPromise[i] = resultOFPromise;
        countOFPromise++;
        if (countOFPromise === promises.length) {
          resolve(resultsOFPromise);
        }
      }
      ).catch(reject);
    });
  })
}

// Пример 1
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]

// Пример 2
// p1, p2 те же
const p3 = Promise.reject('firstError');
promiseAll([p1, p3, p2]).catch(error => console.log(error)); // firstError