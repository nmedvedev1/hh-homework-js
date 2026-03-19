/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  const obj = {};

  return new Proxy(obj, {
    set(target, prop, value) {
      if (!(prop in schema)) {
        throw new Error('ошибка');
      }

      const expectedType = schema[prop];
      const actualType = typeof value;

      if (actualType !== expectedType) {
        throw new TypeError(
          "Ошибка"
        );
      }

      target[prop] = value;
      return true;
    },

    get(target, prop) {
      return target[prop];
    },
  });
}

const user = typedObject({
  name: "string",
  age: "number",
});

console.log(user.name = "Ivan"); // выполнится
console.log(user.age = 20);      // выполнится
console.log(user.age = "20");    // должно выбросить ошибку