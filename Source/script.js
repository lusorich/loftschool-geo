var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

let array = [];
let obj = {
    name: '',
    place: '',
    comment: '',
};


function init() {
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



    function getAddress(coords) {

        ymaps.geocode(coords).then(function(res) {
            var firstGeoObject = res.geoObjects.get(0);

            placemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContentHeader: firstGeoObject.getAddressLine()
                });
        });
    }

    myMap.events.add('click', function(e) {

        var coords = e.get('coords');


        getAddress(coords);

        ymaps.geocode(coords).then(function(res) {
            var firstGeoObject = res.geoObjects.get(0);

            placemark.properties.set({
                balloonContentHeader: firstGeoObject.getAddressLine()
            })
        })

        var placemark = new ymaps.Placemark(coords, {
            balloonContentHeader: getAddress(coords),
            balloonContentFooter: '<label class="form__label" for="name"> <h2>Ваш отзыв</h2>' +
                '<input class="form__input" type="text" name="name" id="name" type="text" value placeholder="Ваше имя" required=""></label>' +
                '<label class="form__label" for="place"><input class="form__input" type="text" name="place" id="place" type="text" value placeholder="Укажите место" required=""></label>' +
                '<textarea name="comment" id="comment" cols="30" rows="10" placeholder="Поделитесь впечатлениями"></textarea>' +
                '<button class="button" id="button">Добавить</button>'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'placemark.svg',
            iconImageSize: [30, 40]
        });

        var buttonAdd = document.getElementById('button');
        var nameInput = document.querySelector('#name');
        var placeInput = document.querySelector('#place');
        var commentInput = document.querySelector('#comment');



        myMap.geoObjects.add(placemark);
        placemark.balloon.open();
  

    });
}


document.addEventListener('click', (e) => {
    elem = e.target;

    if (elem.id == 'button') {
        console.log('YES');
    }
})