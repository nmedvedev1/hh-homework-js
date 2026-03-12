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
        let results = new Array(promises.length).fill(null);

        let promisesLeft = 0;
        let current = 0;

        for (const promise of promises) {
            promisesLeft++;
            const curr = current; // to fix current in place for the promise

            promise.then((res) => {
                results[curr] = res;
                promisesLeft--;
                if (promisesLeft === 0) {
                    resolve(results);
                }
            }, reject);

            current++;
        }
    });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log); // [1, 2]