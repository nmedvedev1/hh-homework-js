/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  return new Proxy({}, {
    set(target, property, value, receiver) {
      if (!schema.hasOwnProperty(property)) {
        throw new Error(`Свойство "${String(property)}" не разрешено схемой`);
      }
      
      const expectedType = schema[property];
      
      const actualType = typeof value;
      
      if (actualType !== expectedType) {
        throw new TypeError(
          `Свойство "${String(property)}" должно быть типа "${expectedType}", ` +
          `получено "${actualType}"`
        );
      }
      
      // использование Reflect
      return Reflect.set(target, property, value, receiver);
    },
    
    // Для всех остальных операций используем поведение по умолчанию
    get(target, property, receiver) {
      return Reflect.get(target, property, receiver);
    },
    
    has(target, property) {
      return Reflect.has(target, property);
    },
    
    ownKeys(target) {
      return Reflect.ownKeys(target);
    },
    
    getOwnPropertyDescriptor(target, property) {
      return Reflect.getOwnPropertyDescriptor(target, property);
    },
    
    deleteProperty(target, property) {
      return Reflect.deleteProperty(target, property);
    },
    
    defineProperty(target, property, descriptor) {
      return Reflect.defineProperty(target, property, descriptor);
    }
  });
}

const user = typedObject({
  name: "string",
  age: "number",
  email: "string"
});

try {
  user.name = "Anastasia";    
  console.log('user.name =', user.name);
  
  user.age = 19;        
  console.log('user.age =', user.age);
  
  user.age = "20";         
} catch (error) {
  console.error('Ошибка:', error.message); 
}

try {
  user.email = "anastasia@hh.ru"; 
  console.log('user.email =', user.email);
  
  user.phone = "9150967868"; 
} catch (error) {
  console.error('Ошибка:', error.message); 
}

console.log('user.name:', user.name); 
console.log('user.age:', user.age);   

try {
  console.log(user.phone);
} catch (error) {
  console.error('Ошибка при чтении:', error.message); 
}

console.log('Ключи объекта:', Object.keys(user)); 
console.log('Есть ли свойство:', 'name' in user); 
console.log('Проверка прототипных методов:', user.toString !== undefined); 

const product = typedObject({
  id: "number",
  title: "string",
  price: "number",
  inStock: "boolean"
});

product.id = 123;
product.title = "Ноутбук";
product.price = 999.99;
product.inStock = true;

console.log('Товар:', product.id, product.title, product.price, product.inStock);

// Ошибка при неверном типе
try {
  product.inStock = "yes"; 
} catch (error) {
  console.error('Ошибка типа:', error.message);
}