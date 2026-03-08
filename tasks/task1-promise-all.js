/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // массив для хранения результатов
    let results = [];
    // счетчик для отслеживания количества выполненных промисов в получения результатов в правильном порядке
    let index = 0;
    // флаг для отслеживания, был ли уже реджект
    let isRejected = false;
    promises.forEach(element => {
      element.then(result => {
        if (isRejected) return;
        // if(typeof result === 'string') {
        //   isRejected  = true;
        //   reject("Strings are not allowed");
        //   return;
        // } Если расскоментировать эту строчку можно увидеть пример работы reject при первой же строке в массиве промисов
        results[index] = result;
        index++;
        if (index === promises.length) {
          resolve(results);
        }
      }).catch(error => {
        if (isRejected) return;
        isRejected = true;
        reject(error);
      });
    });
  });
}


const p1 = Promise.resolve(1);
const p2 = Promise.resolve('2');
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3]).then(result => console.log(result)).catch(error => console.error(error)); // [1, 2, 3]