'use strict';

(function () {
  var pins = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  var onEscKeyDown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      window.mapCard.closeCard();

      window.removeEventListener('keydown', onEscKeyDown);
    }
  };

  var removePins = function () {
    Array.from(pins.children).forEach(function (element) {
      if (!element.classList.contains('map__overlay') && !element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };

  var renderPins = function (data) {
    var template = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();

    data.forEach(function (item) {
      var pin = template.cloneNode(true);

      pin.style.left = item.location.x + 'px';
      pin.style.top = item.location.y + 'px';
      pin.children[0].src = item.author.avatar;
      pin.children[0].alt = item.offer.title;

      fragment.appendChild(pin);

      // TODO разобраться с вложенностью callback
      // eslint-disable-next-line no-shadow
      (function (item) {
        // TODO разобраться с вложенностью callback
        // eslint-disable-next-line max-nested-callbacks
        pin.addEventListener('click', function () {
          window.mapCard.closeCard();

          var newPopup = window.mapCard.createCard(item);

          // TODO разобраться с вложенностью callback
          // eslint-disable-next-line max-nested-callbacks
          window.addEventListener('keydown', onEscKeyDown);

          window.utils.map.insertBefore(newPopup, filtersContainer);
        });
      })(item);
    });

    pins.appendChild(fragment);
  };

  var createOfferSuccessHandler = function () {
    removePins();
  };

  window.data.addCreateOfferSuccessHandlers(createOfferSuccessHandler);

  window.mapPin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
