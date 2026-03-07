/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
    // TODO: реализуйте
    return new Proxy(
        {},
        {
            set: (target, key, newValue, receiver) => {
                const typeFromSchema = new Set(schema[key]?.split('|') || [])
                const checkedType = newValue === null ? 'null' : typeof newValue

                if (
                    typeFromSchema.size > 0 &&
                    !typeFromSchema.has(checkedType)
                ) {
                    throw new Error('Not allowed type')
                }

                return Reflect.set(target, key, newValue, receiver)
            },
        },
    )
}

const user = typedObject({
    name: 'string',
    age: 'number',
    height: 'string|null',
    width: 'string|number',
})

user.name = 'Ivan' // выполнится
user.age = 20 // выполнится
// user.age = '20' // должно выбросить ошибку
// user.height = 543 // должно выбросить ошибку
user.height = '543' // выполнится
user.width = '52' // выполнится

console.log(user)
