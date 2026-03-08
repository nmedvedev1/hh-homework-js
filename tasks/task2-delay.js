/*
Задание 2: Реализуйте delay

Требования:
- delay(ms) возвращает промис
- Промис резолвится через ms миллисекунд
*/

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(500).then(() => console.log("Готово через 500мс"));

async function example() {
  console.log('Начало');
  await delay(1000);
  console.log('Прошла 1 секунда');
  await delay(500);
  console.log('Прошло ещё 500мс');
}

example();

console.time('delay');
delay(800).then(() => console.timeEnd('delay')); // ~800мс