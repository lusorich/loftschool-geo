var myMap;

var arrayUsersData = [];


ymaps.ready(() => {

    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });

    function getAddress(coords) {

        ymaps.geocode(coords).then(res => {
            var firstGeoObject = res.geoObjects.get(0);
            addressLink.textContent = firstGeoObject.getAddressLine();
        });
    }

    var coords;

    myMap.events.add('click', (e) => {

        coords = e.get('coords');
        getAddress(coords);
    });

    var popup = document.querySelector('.popup');
    var button = document.querySelector('.button');
    var map = document.getElementById('map');
    var addressLink = document.querySelector('.address__link');
    var name = document.getElementById('name');
    var place = document.getElementById('place');
    var comment = document.getElementById('comment');
    var comment__name = document.querySelector('.comment__name');

    map.addEventListener('click', (e) => {
        popup.style.top = `${e.clientY}px`;
        popup.style.left = `${e.clientX}px`;
        popup.classList.toggle('hidden');

    });

    button.addEventListener('click', () => {
        let date = '';
        let userData = {};

        userData.name = name.value;
        userData.place = place.value;
        userData.comment = comment.value;
        userData.date = date;
        userData.address = addressLink.textContent;
        userData.coords = coords;

        if (!userData.name || !userData.place || !userData.comment) {
            alert('Введите все поля');
        } else {
            name.value = '';
            place.value = '';
            comment.value = '';
            createPlacemark(coords, userData, clusterer);
            arrayUsersData.push(userData);
            createPopup(coords, arrayUsersData);
        }
    })


        var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
        );

            var clusterer = new ymaps.Clusterer({
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: customItemContentLayout,
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 200,
            clusterBalloonContentLayoutHeight: 130,
            clusterBalloonPagerSize: 5
        });

    function createPlacemark(coords, userData, clusterer) {
        var placemark = new ymaps.Placemark(coords, {
            balloonContentHeader: `<span>${userData.place}</span>`,
            balloonContentBody: `<a id='address' href="#">${userData.address}</a>`
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/placemark.svg',
            iconImageSize: [30, 40]
        });

        clusterer.add(placemark);
        myMap.geoObjects.add(clusterer);
    }

    document.addEventListener('click', (e) => {
        let element = e.target;
        if (element.id === 'address') {
            console.log(arrayUsersData);
        }
    })

    var template;

    function createPopup(coords, arrayUsersData) {
        this.comment.textContent = 'olalalala';
        comment__name.textContent = '1';
        console.log('5');
        console.log(comment.textContent);
        console.log(comment);    }

});