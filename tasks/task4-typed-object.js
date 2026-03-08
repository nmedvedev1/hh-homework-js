/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  // Создаём объект с внутренним хранилищем данных
  const data = {};
  
  // Создаём прокси для перехвата операций с объектом
  return new Proxy(data, {
    // Перехватываем установку свойств
    set(target, property, value) {
      // Проверяем, есть ли такое свойство в схеме
      if (!schema.hasOwnProperty(property)) {
        throw new Error(`Свойство "${property}" не разрешено схемой`);
      }
      
      // Получаем ожидаемый тип из схемы
      const expectedType = schema[property];
      
      // Определяем фактический тип значения
      const actualType = typeof value;
      
      // Проверяем соответствие типов
      if (actualType !== expectedType) {
        throw new TypeError(
          `Свойство "${property}" должно быть типа "${expectedType}", ` +
          `получено "${actualType}"`
        );
      }
      
      // Если проверка пройдена, сохраняем значение
      target[property] = value;
      return true; // Успешная установка
    },
    
    // Перехватываем получение свойств
    get(target, property) {
      // Проверяем, есть ли такое свойство в схеме
      if (!schema.hasOwnProperty(property)) {
        throw new Error(`Свойство "${property}" не разрешено схемой`);
      }
      
      // Возвращаем значение или undefined, если свойство ещё не установлено
      return target[property];
    },
    
    // Перехватываем проверку наличия свойства
    has(target, property) {
      return property in schema;
    },
    
    // Перехватываем получение списка ключей
    ownKeys(target) {
      return Object.keys(schema);
    },
    
    // Перехватываем получение дескриптора свойства
    getOwnPropertyDescriptor(target, property) {
      if (property in schema) {
        return {
          enumerable: true,
          configurable: true,
          writable: true
        };
      }
      return undefined;
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