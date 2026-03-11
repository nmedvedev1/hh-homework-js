/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {

  let obj = {}

  return new Proxy(obj, {
    set(target, prop, val){

      if(!schema.hasOwnProperty(prop)) throw new Error("No such property in object")

      if(typeof val === schema[prop]){
        target[prop] = val
        return true
      } else {
        throw new Error("wrong type")
      }
    }
  })
}

const user = typedObject({
  name: "string",
  age: "number",
});

console.log(1)
user.name = "Ivan"; // выполнится
console.log(2)
user.age = 20;      // выполнится
console.log(4)
user.sex = "male";    // должно выбросить ошибку
console.log(3)
user.age = "20";    // должно выбросить ошибку
