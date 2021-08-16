// Slick Slider Welcome
function sliderWelcome(slider) {
  if (slider.length) {
    slider.slick({
      slidesToShow: 1, // Сколько слайдов показывать на экране
      slidesToScroll: 1, // Сколько слайдов пролистывать за раз
      fade: true, // Эффект исчезновения
      dots: true, // Пагинация
      arrows: false, // Стрелки
      autoplay: true, // Автопрокрутка
      autoplaySpeed: 2000, // Скорость автопрокрутки
      infinite: false, // Зацикленное пролистывание
      adaptiveHeight: false, // Подгоняет высоту слайдера под элемент слайда
      swipe: true, // Перелистывание пальцем
      draggable: true, // Перелистывание мышью
    });
  }
}
sliderWelcome($('.js-welcome-slider '));

// Slick Slider Product
function sliderProduct(slider,sliderFor) {
  if (slider.length) {
    slider.slick({
      slidesToShow: 1, // Сколько слайдов показывать на экране
      slidesToScroll: 1, // Сколько слайдов пролистывать за раз
      asNavFor: sliderFor, // Связь со слайдерами
      dots: false, // Пагинация
      arrows: false, // Стрелки
      infinite: false, // Зацикленное пролистывание
      swipe: true, // Перелистывание пальцем
      draggable: true, // Перелистывание мышью
    });

    sliderFor.slick({
      slidesToShow: 3, // Сколько слайдов показывать на экране
      slidesToScroll: 1, // Сколько слайдов пролистывать за раз
      dots: false, // Пагинация
      arrows: false, // Стрелки
      asNavFor: slider, // Связь со слайдерами
      focusOnSelect: true, // Выбрать слайд кликом
      infinite: false, // Зацикленное пролистывание
    });
  }
}
sliderProduct($('#product-slider'), $('#product-slider-nav'));