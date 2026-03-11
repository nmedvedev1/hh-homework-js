/*
Задание 2: Реализуйте delay

Требования:
- delay(ms) возвращает промис
- Промис резолвится через ms миллисекунд
*/

function delay(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

delay(500).then(() => console.log("Готово через 500мс"));
