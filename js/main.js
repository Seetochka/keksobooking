'use strict';

var MAP_WIDTH = 1200;
var MAP_PIN_MIN_Y_POSITION = 130;
var MAP_PIN_MAX_Y_POSITION = 630;

var titles = [
    'Срочно сдам квартиру',
    'Отличный вариант для вас',
    'Сдается квартира',
    'Уютная квартира'
];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkInOutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = [
    'Сдаю хорошую квартиру семье без детей и животных',
    'Теплая, светлая квартира',
    'Квартира сразу после ремонта',
    'Сдам квартиру только итальянцам'
];
var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var randomNumber = function (min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

var createRandomArray = function (array) {
    var quantity = randomNumber(1, array.length);
    var newArray = [];

    if (quantity === array.length) {
        return array;
    }

    for (var i = 0; i < quantity; i++) {
        var value = array[randomNumber(0, (array.length - 1))];

        while (newArray.includes(value)) {
            value = array[randomNumber(0, (array.length - 1))];
        }

        newArray.push(value); 
    }

    return newArray;
}

var createMockData = function () {
    var mockData = [];

    for (var i = 0; i < 8; i++) {
        var x = randomNumber(0, MAP_WIDTH);
        var y = randomNumber(MAP_PIN_MIN_Y_POSITION, MAP_PIN_MAX_Y_POSITION);

        mockData.push({
            author: {
                avatar: "img/avatars/user0" + randomNumber(1, 8) + ".png"
            },
        
            offer: {
                title: titles[randomNumber(0, 3)],
                address: x + ', ' + y,
                price: randomNumber(30000, 100000),
                type: types[randomNumber(0, 3)],    
                rooms: randomNumber(1, 4),
                guests: randomNumber(1, 8),
                checkin: checkInOutTimes[randomNumber(0, 2)],
                checkout: checkInOutTimes[randomNumber(0, 2)],
                features: createRandomArray(features),
                description: descriptions[randomNumber(0, 3)],
                photos: createRandomArray(photos)
            },
        
            location: {
                x,
                y
            }
        });
    }

    return mockData;
}

var mocks = createMockData();
var pins = document.querySelector('.map__pins');

var renderPins = function (data) {
    var template = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();
    
    for (var item of data) {
        var pin = template.cloneNode(true);

        pin.style.left = item.location.x + 'px';
        pin.style.top = item.location.y + 'px';
        pin.children[0].src = item.author.avatar;
        pin.children[0].alt = item.offer.title;

        fragment.appendChild(pin);  
    }

    pins.appendChild(fragment);
}

renderPins(mocks);

//Ниже второе задание

var map = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');

var createCard = function (data) {
    var templateCard = document.querySelector('#card').content.querySelector('article');
    var fragmentCard = document.createDocumentFragment();

    var card = templateCard.cloneNode(true);

    var features = '';

    for (var feature of data.offer.features) {
        features += '<li class="popup__feature popup__feature--' + feature + '"></li>';
    }

    var photos = '';

    for (var photo of data.offer.photos) {
        photos += '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    var typesRus = {
        palace: 'Дворец',
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало'
    };

    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = typesRus[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    card.querySelector('.popup__features').innerHTML = features;
    card.querySelector('.popup__description').textContent = data.offer.description;
    card.querySelector('.popup__photos').innerHTML = photos;
    card.querySelector('.popup__avatar').src = data.author.avatar;

    fragmentCard.appendChild(card);

    return fragmentCard;
}

map.insertBefore(createCard(mocks[0]), filtersContainer);
