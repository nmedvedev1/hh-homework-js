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
      const results = [];
      // счетчик для отслеживания количества выполненных промисов в получения результатов в правильном порядке
      let index = 0;
      // флаг для отслеживания, был ли уже реджект
      let isRejected = false;
      
      if(promises.length === 0) {
        resolve(results);
        return;
      }
      promises.forEach((element, i) => {
        if(element instanceof Promise) {
          element.then(value => {
            if (isRejected) return;
            results[i] = value;
            index++;
            if (index === promises.length) {
              resolve(results);
            }
          }).catch(error => {
            if (isRejected) return;
            isRejected = true;
            reject(error);
          });
        } else {
          results[i] = element
          index++;
        }
    });
  })
}


const p1 = Promise.resolve(1);
const p2 = Promise.resolve('2');
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3]).then(result => console.log(result)).catch(error => console.error(error)); // [1, 2, 3]

const p4 = new Promise(res => setTimeout(() => res('first'), 100));
const p5 = new Promise(res => setTimeout(() => res('second'), 10));

promiseAll([p4, p5]).then(console.log);

promiseAll([Promise.resolve(1), 2]).then(console.log);

Promise.all([1, 2]).then(console.log); // [1, 2] - Promise.all также поддерживает не промисы, а обычные значения, которые он просто пропускает в результат.