/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  // TODO: реализуйте

  return new Promise((resolve,reject) => {

    let completedPromises = [];
    let promisesCounter = 0;

    if (!promises.length) {
      resolve(completedPromises);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
        completedPromises[index] = value;
        promisesCounter++;

        if (promisesCounter === promises.length){
          resolve(completedPromises);
        }
      }).catch(reject);
    })
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]

promiseAll([]).then(console.log); // []

promiseAll([p1, Promise.reject('error'), p2]) // Ошибка
  .then(console.log)
  .catch(err => console.log(err));