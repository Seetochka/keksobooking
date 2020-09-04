'use strict';

(function () {
    var closeCard = function () {
        var card = window.utils.map.querySelector('.map__card');

        if (card) {
            card.remove();
        }
    };

    var createCard = function (data) {
        var templateCard = document.querySelector('#card').content.querySelector('article');
        var fragmentCard = document.createDocumentFragment();

        var card = templateCard.cloneNode(true);
        var cardClose = card.querySelector('.popup__close');

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

        cardClose.addEventListener('click', closeCard);

        return fragmentCard;
    };

    window.mapCard = {
        closeCard:closeCard,
        createCard: createCard
    };
})();
