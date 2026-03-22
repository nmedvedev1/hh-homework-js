/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/
function typedObject(schema) {
    return new Proxy({}, {
        set: function (target, prop, value, receiver) {
            if (typeof prop !== "string" || !(prop in schema)) {
                throw new Error('Свойство "${String(prop)}" не описано в схеме');
            }
            var expectedType = schema[prop];
            var actualType = typeof value;
            if (actualType !== expectedType) {
                throw new TypeError('Неверный тип для свойства "${String(prop)}": ожидался ${expectedType}, получен ${actualType}');
            }
            return Reflect.set(target, prop, value, receiver);
        },
    });
}
var user = typedObject({
    name: "string",
    age: "number",
});
user.name = "Ivan";
user.age = 20;
console.log(user.name, user.age);
// Ошибка TypeScript:
// user.age = "20";
