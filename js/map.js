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

  var disabledFilterFields = function () {
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

  var onMapPinMainInteraction = function () {
    window.utils.map.classList.remove('map--faded');

    enableFilterFields();
    callMapPinMainInteractionHandlers();

    window.mapPin.renderPins(offers);
  };

  disabledFilterFields();

  var dataLoadHandler = function (data) {
    offers = data;

    window.utils.mapPinMain.addEventListener('mousedown', onMapPinMainInteraction);
    window.utils.mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ENTER_KEYCODE) {
        onMapPinMainInteraction();
      }
    });
  };

  window.data.addDataLoadHandler(dataLoadHandler);

  window.map = {
    getMapPinMainCoordinates: getMapPinMainCoordinates,
    addMapPinMainInteractionHandler: function (handler) {
      mapPinMainInteractionHandlers.push(handler);
    },
    removeMapPinMainInteractionHandler: function (handler) {
      mapPinMainInteractionHandlers = mapPinMainInteractionHandlers
                .filter(function (a) {
                  return a !== handler;
                });
    }
  };
})();
