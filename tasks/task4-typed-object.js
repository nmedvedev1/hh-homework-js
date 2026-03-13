/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  return new Proxy({}, {
    set(target, key, value) {
      if (key in schema && typeof value !== schema[key]) {
        throw new TypeError("Error: Invalid type");
      }

      target[key] = value;
      return true;
    }
  });
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится
user.age = "20";    // должно выбросить ошибку