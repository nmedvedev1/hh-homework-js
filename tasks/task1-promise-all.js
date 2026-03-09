/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let doneCount = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          doneCount++;

          if (doneCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]

//свои тесты

//порядок
const a = new Promise((res) => setTimeout(() => res("1"), 100));
const b = new Promise((res) => setTimeout(() => res("2"), 20));

promiseAll([a, b]).then((res) => {
  console.log("test2:", res);
});

//с числами
promiseAll([1, 2, 3]).then((res) => {
  console.log("test3:", res); //[1, 2, 3]
});

//пустой массив
promiseAll([]).then((res) => {
  console.log("test4:", res); //[]
});

//ошибка
const ok = Promise.resolve("ok");
const fail = Promise.reject("error");

promiseAll([ok, fail])
  .then((res) => console.log("test5:", res))
  .catch((err) => console.log("test5 error:", err)); //error
