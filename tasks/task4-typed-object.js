/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  const obj = {};

  for (const key in schema) {
    const expectedType = schema[key];
    let value;

    Object.defineProperty(obj, key, {
      get() {
        return value;
      },
      set(newValue) {
        const actualType = typeof newValue;

        if (actualType !== expectedType) {
          throw new TypeError(
            `Error`
          );
        }
        value = newValue;
      },
      enumerable: true,
    });
  }
  return obj;
}


const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится
user.age = "20";    // должно выбросить ошибку