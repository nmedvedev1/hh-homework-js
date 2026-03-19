/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/


function typedObject(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (prop in schema) {
        const expectedType = schema[prop];
        const actualType = typeof value;
        if (actualType !== expectedType) {
          throw new TypeError(
            `Неверный тип для поля "${String(prop)}": ожидался ${expectedType}, а получен ${actualType}`
          );
        }
      }
      target[prop] = value;
      return true;
    }
  });
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan";
user.age = 20; 
console.log(user); 
