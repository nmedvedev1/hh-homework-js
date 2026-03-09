/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (!(prop in schema)) {
        throw new Error(`Свойство "${prop}" не определено в схеме`)
      }
      const expectedType = schema[prop];
      const actualType = typeof value;
      if (actualType !== expectedType) {
        throw new Error(`Свойство "${prop}" должно быть типа ${expectedType}, получен ${actualType}`)
      }
      target[prop] = value;
      return true
    }
  });
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится
user.age = "20";    // выбросит ошибку, потому что это тип string, а не number
user.color = "red" // выбросит ошибку, потому что нет color в объекте user