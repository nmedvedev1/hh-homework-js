/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

//версия через гет и сет
function typedObject(schema) {
  const obj = {};
  const storage = {};

  Object.keys(schema).forEach((key) => {
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,

      get() {
        return storage[key];
      },

      set(value) {
        const expectedType = schema[key];

        if (typeof value !== expectedType) {
          throw new TypeError(
            `Свойство "${key}" должно быть типом ${expectedType}`,
          );
        }

        storage[key] = value;
      },
    });
  });

  Object.preventExtensions(obj);

  return obj;
}

//версия с прокси
function typedObject(schema) {
  const target = {};

  return new Proxy(target, {
    set(obj, prop, value, receiver) {
      if (!(prop in schema)) {
        throw new TypeError(`Свойство "${String(prop)}" не описано в схеме`);
      }

      const expectedType = schema[prop];

      if (typeof value !== expectedType) {
        throw new TypeError(
          `Свойство "${String(prop)}" должно быть типом ${expectedType}`,
        );
      }

      return Reflect.set(obj, prop, value, receiver);
    },
  });
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20; // выполнится
user.age = "20"; // должно выбросить ошибку
user.favAnimal = "unicorn"; //тем более должно выбросить ошибку

console.log(user);
