// функция позволяет установить обработчик func,
// который не срабатывает слишком часто -
// если immediate=false - func будет вызван в конце серии событий,
// если immediate=true - func будет вызван в начале серии событий
// серия событий - последовательность событий,
// интервалы между которыми не превыщают interval миллисекунд
export function debounce(func, interval, immediate) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timer = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(later, interval);
    if (callNow) func.apply(context, args);
  };
}
