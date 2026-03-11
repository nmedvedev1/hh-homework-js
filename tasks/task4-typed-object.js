/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  return new Proxy(
    {},
    {
      set(target, prop, value, receiver) {
        if (!Object.hasOwn(schema, prop)) {
          throw new Error(`${prop} is not in schema`);
        }

        if (typeof value !== schema[prop]) {
          throw new Error("wrong type");
        }

        return Reflect.set(target, prop, value, receiver);
      },
    },
  );
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20; // выполнится
user.age = "20"; // должно выбросить ошибку
