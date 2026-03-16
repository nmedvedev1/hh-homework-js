function typedObject(schema) {
  const obj = {};

  return new Proxy(obj, {
    set(target, prop, value) {
      const expectedType = schema[prop];

      if (expectedType && typeof value !== expectedType) {
        throw new Error(`Expected ${expectedType} but got ${typeof value}`);
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

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится
user.age = "20";    // должно выбросить ошибку
