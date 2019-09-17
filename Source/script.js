var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        var placemark = new ymaps.Placemark(coords, {
        // Зададим содержимое заголовка балуна.
        balloonContentHeader: '<a href = "#">Рога и копыта</a><br>' +
            '<span class="description">Сеть кинотеатров</span>',
        // Зададим содержимое основной части балуна.
        balloonContentBody: '<img src="img/cinema.jpg" height="150" width="200"> <br/> ' +
            '<a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a><br/>' +
            '<b>Ближайшие сеансы</b> <br/> Сеансов нет.',
        // Зададим содержимое нижней части балуна.
        balloonContentFooter: '<form action="" method="get"> <label class="form__label" for="name"> <h2>Ваш отзыв</h2>' + 
                              '<input class="form__input" type="text" name="name" id="name" type="text" value placeholder="Ваше имя" required=""></label>' + 
                              '<label class="form__label" for="place"><input class="form__input" type="text" name="place" id="place" type="text" value placeholder="Укажите место" required=""></label>' +
                              '<textarea name="comment" id="comment" cols="30" rows="10" placeholder="Поделитесь впечатлениями"></textarea>' +
                              '<button class="button" type="submit">Добавить</button></form>',
        // Зададим содержимое всплывающей подсказки.
        hintContent: 'Рога и копыта'
    }, {
            iconLayout: 'default#image',
            iconImageHref: 'placemark.svg',
            iconImageSize: [30, 40]
        });

        myMap.geoObjects.add(placemark);
        placemark.balloon.open();
    });

}