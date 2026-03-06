/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
    // TODO: реализуйте
    const data = new Map()
    return function (...args) {
        const key = JSON.stringify(args)
        if (data.has(key)) {
            console.log('Get from cache!')
            return data.get(key)
        }

        const result = fn(...args)
        data.set(key, result)
        return result
    }
}

const slowAdd = (a, b) => {
    return a + b
}

const memoAdd = memoize(slowAdd)
memoAdd(1, 2) // возвращает 3
memoAdd(1, 2) // из кэша, возвращает 3
memoAdd(2, 2) // возвращает 4
