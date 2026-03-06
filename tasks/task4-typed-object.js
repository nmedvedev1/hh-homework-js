/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  const data = new Object();

  var handler = {
    set: function (target, key, value) {
      if (!(key in schema)) {
        throw new Error(`Unexpected key: ${key}`);
      }

      if (typeof value !== schema[key]) {
        throw new Error(`expected: '${schema[key]}' but got '${typeof value}'`);
      } else {
        target[key] = value;
        return true;
      }
    },
  };

  const proxy = new Proxy(data, handler);

  return proxy;
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20; // выполнится
user.age = "20"; // должно выбросить ошибку
