'use strict';

(function () {
  var mapPinMainInteractionHandlers = [];

  var callMapPinMainInteractionHandlers = function () {
    if (mapPinMainInteractionHandlers.length) {
      mapPinMainInteractionHandlers.forEach(function (handler) {
        handler();
      });
    }
  };

  var filters = document.querySelector('.map__filters');

  var offers = null;

  var disableFilterFields = function () {
    Array.from(filters.elements).forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  var enableFilterFields = function () {
    Array.from(filters.elements).forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var getMapPinMainCoordinates = function () {
    return {x: parseInt(window.utils.mapPinMain.style.left, 10), y: parseInt(window.utils.mapPinMain.style.top, 10)};
  };

  var defaultMapPinMainCoordinates = getMapPinMainCoordinates();

  var disableMap = function () {
    disableFilterFields();
    window.mapPin.removePins();

    window.utils.mapPinMain.style.left = defaultMapPinMainCoordinates.x + 'px';
    window.utils.mapPinMain.style.top = defaultMapPinMainCoordinates.y + 'px';

    window.utils.map.classList.add('map--faded');
  };

  var onMapPinMainInteraction = function () {
    window.utils.map.classList.remove('map--faded');

    enableFilterFields();
    callMapPinMainInteractionHandlers();

    window.mapPin.renderPins(offers.slice(0, window.utils.MAX_PIN_COUNT));
  };

  var createOfferSuccessHandler = function () {
    disableMap();
  };

  disableFilterFields();

  var dataLoadHandler = function (data) {
    offers = data;

    window.utils.mapPinMain.addEventListener('mousedown', onMapPinMainInteraction);
    window.utils.mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ENTER_KEYCODE) {
        onMapPinMainInteraction();
      }
    });
  };

  var filtersChangeHandler = function (filteredOffers) {
    window.mapPin.removePins();
    window.mapPin.renderPins(filteredOffers.slice(0, window.utils.MAX_PIN_COUNT));
  };

  window.data.addDataLoadHandler(dataLoadHandler);
  window.data.addCreateOfferSuccessHandlers(createOfferSuccessHandler);
  window.mapFilters.addFiltersChangeHandler(filtersChangeHandler);

  window.map = {
    getMapPinMainCoordinates: getMapPinMainCoordinates,
    addMapPinMainInteractionHandler: function (handler) {
      mapPinMainInteractionHandlers.push(handler);
    },
    disableMap: disableMap
  };
})();
