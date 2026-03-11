/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  // TODO: реализуйте

  return new Proxy({}, {
    set(target, key, value) {
      if (!(key in schema)) {
        throw new Error(`Unknown key: ${key}`);
      }

      if (typeof value !== schema[key]) {
        throw new Error(`Cannot set ${typeof value} for ${key}`);
      }

      return Reflect.set(target, key, value);
    }
  })
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится

try{
  user.age = "20";
} catch(err) {
  console.log(err.message);
} // Ошибка о неправильном типе

try{
  user.gender = "Male";
} catch(err) {
  console.log(err.message);
} // Ошибка об отсутствии ключа

