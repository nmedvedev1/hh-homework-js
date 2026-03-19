/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  return new Proxy({}, {
    set(target, prop, val, receiver) {
         if (!schema[prop]) {
        throw new Error("Свойство отсутствует в схеме");
      }
      if (typeof val !== schema[prop]) {
        throw new TypeError ("Неверный тип данных")
      }
      return Reflect.set(target, prop, val, receiver);
    }   
  })
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится
user.age = "20";    // должно выбросить ошибку