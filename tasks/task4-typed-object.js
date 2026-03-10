/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
    const storage = {};

    return new Proxy(storage, {
        set(target, key, value) {
            if (!(key in schema)) {
                throw new Error(`Отсутствует ключ "${key}"`);
            }

            if (typeof value !== schema[key]) {
                throw new Error(`Неверный тип данных`);
            }
            else {
                target[key] = value;
                return true;
            }
        },
        get(target, key) {
            return target[key];
        }
    });
}

const user = typedObject({
    name: "string",
    age: "number",
});

try {
    user.name = "Ivan"; // выполнится
    console.log(user.name); // "Ivan"

    user.name = 20;      // выполнится
    console.log(user.age); // 20

    user.age = "20";    // должно выбросить ошибку
} catch (error) {
    console.error(error.message);
}