/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {

  return new Proxy({}, {
    set(target, prop, val){

      if(!Object.hasOwn(schema, prop)) throw new Error("No such property in object")

      if(typeof val === schema[prop]){
        
        return Reflect.set(target, prop, val)
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
