/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
    return new Proxy({}, {
        set(target, prop, value) {
          if(typeof value !== schema[prop]) {
            throw new TypeError(`Expected type ${schema[prop]} for property ${prop}, but got ${typeof value}`);
            return false;
          }
          target[prop] = value;
          return true;
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
console.log(user); // { name: "Ivan", age: 20 } - несмотря на ошибку, значение все равно присвоится, так как в условии не указано, что нужно предотвратить присвоение при ошибке. Если нужно предотвратить, то можно добавить return false; после throw в блоке if.