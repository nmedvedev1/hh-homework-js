/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
    // TODO: реализуйте
    return new Promise((res, rej) => {
        if (promises.length === 0) return res([])

        const result = [...promises]

        let count = 0

        result.forEach((item, i) => {
            Promise.resolve(item)
                .then((data) => {
                    result[i] = data
                    count++
                    if (count === result.length) {
                        res(result)
                    }
                })
                .catch((err) => {
                    rej(err)
                })
        })
    })
}

const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)

promiseAll([p1, p2, 3]).then(console.log) // [1, 2, 3]
promiseAll([]).then(console.log) // []
promiseAll([p1, p2, Promise.reject('error')])
    .then(console.log) // не выполнится
    .catch(console.error) // error
