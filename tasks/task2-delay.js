/*
Задание 2: Реализуйте delay

Требования:
- delay(ms) возвращает промис
- Промис резолвится через ms миллисекунд
*/

function delay(ms) {
  // TODO: реализуйте

  if (typeof ms !== 'number'){
    return Promise.reject("Invalid argument");
  }
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(500).then(() => console.log("Готово через 500мс")); // Должно завершиться

delay(" ").then(() => console.log("Завершено")) // Ошибка
  .catch(err => console.log(err));

delay(-2).then(() => console.log("Завершено")) // Работа, как с 0
  .catch(err => console.log(err));