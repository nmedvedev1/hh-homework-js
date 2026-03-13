/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

// изначальный подход подсмотрен у https://stackoverflow.com/a/31299579,
// но функцию реализовал сам (там было написано не очень корректно энивей)
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = []

        if (promises.length === 0) {
            resolve(results);
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((res) => {
                results[index] = res;
                if (results.length === promises.length) {
                    resolve(results);
                }
            }, reject);
        })
    });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]
promiseAll([]).then(console.log) // []
promiseAll([1, 2]).then(console.log); // [1, 2]