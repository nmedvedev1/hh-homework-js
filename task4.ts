/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

type PrimitiveTypeName = "string" | "number" | "boolean" | "symbol" | "bigint" | "undefined";

type Schema = Record<string, PrimitiveTypeName>;

type TypeFromSchemaValue<T extends PrimitiveTypeName> =
  T extends "string" ? string :
  T extends "number" ? number :
  T extends "boolean" ? boolean :
  T extends "symbol" ? symbol :
  T extends "bigint" ? bigint :
  T extends "undefined" ? undefined :
  never;

type TypedObjectFromSchema<TSchema extends Schema> = {
  [K in keyof TSchema]: TypeFromSchemaValue<TSchema[K]>;
};

function typedObject<TSchema extends Schema>(
  schema: TSchema
): TypedObjectFromSchema<TSchema> {
  return new Proxy({} as TypedObjectFromSchema<TSchema>, {
    set(target, prop: string | symbol, value, receiver) {
      if (typeof prop !== "string" || !(prop in schema)) {
        throw new Error('Свойство "${String(prop)}" не описано в схеме');
      }

      const expectedType = schema[prop];
      const actualType = typeof value;

      if (actualType !== expectedType) {
        throw new TypeError(
          'Неверный тип для свойства "${String(prop)}": ожидался ${expectedType}, получен ${actualType}'
        );
      }

      return Reflect.set(target, prop, value, receiver);
    },
  });
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan";
user.age = 20;
console.log(user.name, user.age);
// Ошибка TypeScript:
// user.age = "20";