/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

import { delay } from "./task2-delay.js";

function promiseAll(promises) {
  if (typeof promises !== "object" || !(Symbol.iterator in promises)) {
    throw new TypeError(`${promises} is not iterable`);
  }

  return new Promise((resolve, reject) => {
    const arrayOfPromises = Array.from(promises);
    if (arrayOfPromises.length === 0) return resolve([]);
    const resultArray = [];
    let counter = 0;
    arrayOfPromises.forEach((item, index) => {
      Promise.resolve(item)
        .then((result) => {
          resultArray[index] = result;
          counter++;
          if (counter === arrayOfPromises.length) {
            resolve(resultArray);
          }
        })
        .catch(reject);
    });
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

const p3 = delay(50).then(() => 3);
const p4 = delay(200).then(() => 4);
const p5 = delay(150).then(() => 5);

promiseAll([p3, p4, p5]).then(console.log); 
Promise.all([p3, p4, p5]).then(console.log);
