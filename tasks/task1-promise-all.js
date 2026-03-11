/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  
  let results = []

  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise(function (resolve, reject) {
    let completed = 0;

    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (result) => {
          completed++
          results[i] = result;

          if (completed === promises.length) {
            resolve(results);
          }
        },
        (error) => reject(error)
      )
    }
  })
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]

