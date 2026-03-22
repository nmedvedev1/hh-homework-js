/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/
function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
        if (promises.length === 0) {
            resolve([]);
            return;
        }
        var results = new Array(promises.length);
        var completed = 0;
        promises.forEach(function (promise, index) {
            Promise.resolve(promise)
                .then(function (value) {
                results[index] = value;
                completed += 1;
                if (completed === promises.length) {
                    resolve(results);
                }
            })
                .catch(reject);
        });
    });
}
var p1 = Promise.resolve(1);
var p2 = Promise.resolve(2);
promiseAll([p1, p2]).then(console.log);
