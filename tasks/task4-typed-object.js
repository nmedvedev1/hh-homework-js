/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
    const data = {};

    return new Proxy(data, {

        set(target, prop, value) {
            if (!(prop in schema)) {
                throw new Error(`invalid property: ${prop}`);
            }

            const expectedType = schema[prop];
            const actualType = typeof value;

            if (actualType !== expectedType) {
                throw new Error(`invalid type of "${prop}". expected: ${expectedType}, got: ${actualType}`);
            }

            target[prop] = value;
            return true;
        },

        get(target, prop) {
            return target[prop];
        }
    });
}


const user = typedObject({
    name: "string",
    age: "number",
});

user.name = "Ivan"; // выполнится
console.log(user.name)

user.age = 20;      // выполнится
console.log(user.age)

try {
    user.age = "20";    // должно выбросить ошибку
} catch (e) {
    console.log(`error while trying to assign string to number:\n ${e}`)
}
