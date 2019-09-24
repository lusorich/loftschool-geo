var myMap;

var arrayUsersData = {
    arrayUsers: []
};


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
        commentWrapper.innerHTML = '';
    });

    var popup = document.querySelector('.popup');
    var button = document.querySelector('.button');
    var map = document.getElementById('map');
    var addressLink = document.querySelector('.address__link');
    var name = document.getElementById('name');
    var place = document.getElementById('place');
    var comment = document.getElementById('comment');
    var commentWrapper = document.querySelector('.comment-wrapper');
    var comment__name = document.querySelector('.comment__name');
    var comment__place = document.querySelector('.comment__place');
    var comment__text = document.querySelector('.comment__text');

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
            arrayUsersData.arrayUsers.push(userData);
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
        var placemark = new ymaps.Placemark(coords,
        {
            balloonContentHeader: `<span>${userData.place}</span>`,
            balloonContentBody: `<a id="address" href="#">${userData.address}</a>`
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/placemark.svg',
            iconImageSize: [30, 40]
        });

         placemark.events.add('click', function (e) {

                e.preventDefault();

                coords = placemark.geometry.getCoordinates();
                let [x, y] = coords;

               
                for (key in arrayUsersData.arrayUsers) {
     		 	let arrayUsersData2 = {
    				arrayUsers: []
				};
           		 if (arrayUsersData.arrayUsers[key].coords[0] == x && arrayUsersData.arrayUsers[key].coords[1] == y) {
           		 	arrayUsersData2.arrayUsers.push(arrayUsersData.arrayUsers[key]);
           		 	createPopup(arrayUsersData.arrayUsers[key].coords, arrayUsersData2);
 				}
			}
            });

        clusterer.add(placemark);
        myMap.geoObjects.add(clusterer);

    }

    document.addEventListener('click', (e) => {
        let element = e.target;
        if (element.id === 'address') {
            console.log(placemark.coords);
        }
    })

    var template;

    function createPopup(coords, arrayUsersData) {
    	getAddress(coords);
        [coordsX, coordsY] = coords;
        let actualData = {
            arrayUsers: []
        };

        for (key in arrayUsersData.arrayUsers) {
            if (arrayUsersData.arrayUsers[key].coords[0] === coordsX && arrayUsersData.arrayUsers[key].coords[1] === coordsY) {
                var template = document.getElementById('template');
                var templateSource = template.innerHTML;
                var rend = Handlebars.compile(templateSource);
                actualData.arrayUsers.push(arrayUsersData.arrayUsers[key]);
                var templateHtml = rend(actualData);
                commentWrapper.innerHTML = templateHtml;
                console.log('hola');
            }
        }
    }

});